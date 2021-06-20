const { EUsmapPropertyType } = require("./enums.js");

exports.UsmapProperty = class UsmapProperty {
	constructor(reader, names) {
		const prop_type = reader.readByteInt();
		this.Type = EUsmapPropertyType[prop_type] || EUsmapPropertyType[255];

		if (this.Type === "StructProperty") {
			this.StructName = names[reader.readUInt32()];
		}

		else if (this.Type === "EnumProperty") {
			this.InnerType = new exports.UsmapProperty(reader, names);
			this.EnumName = names[reader.readUInt32()];
		}

		else if (this.Type === "ArrayProperty") {
			this.InnerType = new exports.UsmapProperty(reader, names);
		}

		else if (this.Type === "SetProperty") {
			this.InnerType = new exports.UsmapProperty(reader, names);
		}

		else if (this.Type === "MapProperty") {
			this.InnerType = new exports.UsmapProperty(reader, names);
			this.ValueType = new exports.UsmapProperty(reader, names);
		}
	}
};