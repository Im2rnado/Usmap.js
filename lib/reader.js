module.exports = class Reader {
	constructor(buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}

	readUInt8() {
		const result = this.buffer.readUInt8(this.offset);
		this.offset += 1;
		return result;
	}

	readUInt16() {
		const result = this.buffer.readUInt16LE(this.offset);
		this.offset += 2;
		return result;
	}

	readUInt32() {
		const result = this.buffer.readUInt32LE(this.offset);
		this.offset += 4;
		return result;
	}

	readByteInt() {
		const byte = this.readByte();
		return Number("0x" + byte.toString("hex"));
	}

	readByte() {
		const byte = Buffer.from(this.buffer.toString("binary", this.offset, this.offset + 1), "binary");
		this.offset += 1;
		return byte;
	}

	readBytes(amount) {
		const bytes = Buffer.from(this.buffer.toString("binary", this.offset, this.offset + amount), "binary");
		this.offset += amount;
		return bytes;
	}

	readFString() {
		const length = this.readByteInt();
		return this.readBytes(length).toString("utf-8");
	}
};