// Small uncompressed ZIP writer for trusted source examples. No remote scripts.
export function sourceZip(files) {
  const enc = new TextEncoder(),
    chunks = [],
    directory = [];
  let offset = 0;
  function crc32(bytes) {
    let c = 0xffffffff;
    for (const b of bytes) {
      c ^= b;
      for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  function header(size) {
    const a = new Uint8Array(size);
    return [a, new DataView(a.buffer)];
  }
  for (const file of files) {
    if (
      !/^[\w.\-/]+$/.test(file.name) ||
      file.name.split('/').includes('..') ||
      file.name.startsWith('/')
    )
      throw Error('Invalid source filename');
    const name = enc.encode(file.name),
      data = enc.encode(file.content),
      crc = crc32(data);
    const [local, l] = header(30);
    l.setUint32(0, 0x04034b50, true);
    l.setUint16(4, 20, true);
    l.setUint16(6, 0x800, true);
    l.setUint16(12, 33, true);
    l.setUint32(14, crc, true);
    l.setUint32(18, data.length, true);
    l.setUint32(22, data.length, true);
    l.setUint16(26, name.length, true);
    const [central, c] = header(46);
    c.setUint32(0, 0x02014b50, true);
    c.setUint16(4, 20, true);
    c.setUint16(6, 20, true);
    c.setUint16(8, 0x800, true);
    c.setUint16(14, 33, true);
    c.setUint32(16, crc, true);
    c.setUint32(20, data.length, true);
    c.setUint32(24, data.length, true);
    c.setUint16(28, name.length, true);
    c.setUint32(42, offset, true);
    chunks.push(local, name, data);
    directory.push(central, name);
    offset += 30 + name.length + data.length;
  }
  const directorySize = directory.reduce((n, a) => n + a.length, 0),
    [end, e] = header(22);
  e.setUint32(0, 0x06054b50, true);
  e.setUint16(8, files.length, true);
  e.setUint16(10, files.length, true);
  e.setUint32(12, directorySize, true);
  e.setUint32(16, offset, true);
  return new Blob([...chunks, ...directory, end], { type: 'application/zip' });
}
