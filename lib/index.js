const { Method } = require("./enums.js");
const { UsmapProperty } = require("./classes.js");
const decompress = require("brotli/decompress");
const Reader = require("./reader");

class Usmap {
	/**
     * - NodeJS Usmap Parser
     * @param {{ debug: Boolean }} options Class options
     * @author Im2rnado
     */
	constructor(options = {}) {
		this.debug = options.debug && options.debug === true ? ((kek) => console.log(kek)) : null;
	}

	/**
     * - Parses the Usmap file
     * @param {Buffer} buf Usmap file buffer
     */
	parse(buf) {
		this.debug("Reading file...");

		const reader = new Reader(buf);

		const magic = reader.readUInt16();
		if (magic != 0x30C4) {
			throw new Error("Invalid Usmap file");
		}

		const version = reader.readByteInt();
		if (version != 0) {
			throw new Error(`Unsupported Usmap version: ${version}`);
		}

		const method = reader.readByteInt();
		if (method < 0 || method > 2) {
			throw new Error(`Invalid Usmap compression method: ${method}`);
		}

		const compressed_size = reader.readUInt32();
		const decompressed_size = reader.readUInt32();

		let data = Buffer.alloc(decompressed_size);
		const bytes = reader.readBytes(compressed_size);

		this.debug(`Usmap file compression method: ${Method[method]}`);

		if (method === 0) data = bytes;
		else if (method === 1) throw new Error("Oodle decompression is not supported");
		else if (method === 2) data = Buffer.from(decompress(bytes));

		if (data.length != decompressed_size) {
			throw new Error("Could not decompressed file correctly");
		}

		this.debug("Successfully decompressed file!");
		return this.deserialize(new Reader(data));
	}

	/** @private */
	deserialize(reader) {
		const mappings = {
			enums: {},
			schemas: {},
			count: {},
		};

		const names_size = reader.readUInt32();
		const names = [];
		for (let i = 0; i < names_size; i++) {
			names[i] = reader.readFString();
		}

		// enums
		const enums_count = reader.readUInt32();
		for (let i = 0; i < enums_count; i++) {
			const name = names[reader.readUInt32()];

			const values_count = reader.readUInt8();
			const values = [];
			for (let j = 0; j < values_count; j++) {
				values[j] = names[reader.readUInt32()];
			}

			mappings.enums[name] = values;
		}

		// schemas
		const schemas_count = reader.readUInt32();
		for (let i = 0; i < schemas_count; i++) {
			const name = names[reader.readUInt32()];
			const super_index = reader.readUInt32();
			const prop_count = reader.readUInt16();

			const serializable_count = reader.readUInt16();
			const props = [];
			for (let j = 0; j < serializable_count; j++) {
				const schema_index = reader.readUInt16();
				const array_size = reader.readByteInt();
				const props_name = names[reader.readUInt32()];
				props[j] = new UsmapProperty(reader, names);
			}

			mappings.schemas[name] = {
				Name: name,
				SuperIndex: super_index,
				PropertyCount: prop_count,
				Properties: props,
			};
		}

		mappings.count = {
			schemas: schemas_count,
			enums: enums_count,
		};

		return mappings;
	}
}

module.exports = Usmap;