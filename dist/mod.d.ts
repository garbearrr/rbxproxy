type PrependNextNum<A extends Array<unknown>> = A['size'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;
type EnumerateInternal<A extends Array<unknown>, N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['size'] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;
export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;

export type i8 = Range<-128, 127>;
export type u8 = Range<0, 255>;
export type i16 = Range<-32768, 32767>;
export type u16 = Range<0, 65535>;
export type i32 = Range<-2147483648, 2147483647>;
export type u32 = Range<0, 4294967295>;

export declare type buffer = object;

export declare namespace buffer {
    /**
     * - Copy ‘count’ bytes from ‘source’ starting at offset ‘sourceOffset’ into the ‘target’ at ‘targetOffset’.
     * - It is possible for ‘source’ and ‘target’ to be the same. Copying an overlapping region inside the same buffer acts as if the source region is copied into a temporary buffer and then that buffer is copied over to the target.
     * - If ‘sourceOffset’ is nil or is omitted, it defaults to 0.
     * - If ‘count’ is ‘nil’ or is omitted, the whole ‘source’ data starting from ‘sourceOffset’ is copied.
     */
    function copy(target: buffer, targetOffset: number, source: buffer, sourceOffset?: number, count?: number): void;
    /**
     * - Creates a buffer of the requested size with all bytes initialized to 0.
     * - Size limit is 1GB or 1,073,741,824 bytes.
     */
    function create(size: number): buffer;
    /**
     * - Sets the ‘count’ bytes in the buffer starting at the specified ‘offset’ to the ‘value’.
     * - If ‘count’ is ‘nil’ or is omitted, all bytes from the specified offset until the end of the buffer are set.
     */
    function fill(b: buffer, offset: number, value: number, count?: number): void;
    /**
     * - Creates a buffer initialized to the contents of the string.
     * - The size of the buffer equals to the length of the string.
     */
    function fromstring(str: string): buffer;
    /**
     * - Returns the size of the buffer in bytes.
     */
    function len(b: buffer): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 32-bit floating-point number
     * - Single-precision IEEE 754 number
     * - If a floating-point value matches any of bit patterns that represent a NaN (not a number), returned value might be converted to a different quiet NaN representation.
     * - Read and write operations use the little endian byte order.
     */
    function readf32(b: buffer, offset: number): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 64-bit floating-point number
     * - Double-precision IEEE 754 number
     * - If a floating-point value matches any of bit patterns that represent a NaN (not a number), returned value might be converted to a different quiet NaN representation.
     * - Read and write operations use the little endian byte order.
     */
    function readf64(b: buffer, offset: number): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 8-bit signed integer
     * - [-128, 127]
     * - Read and write operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     */
    function readi8(b: buffer, offset: number): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 16-bit signed integer
     * - [-32,768, 32,767]
     * - Read and write operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     */
    function readi16(b: buffer, offset: number): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 32-bit signed integer
     * - [-2,147,483,648, 2,147,483,647]
     * - Read and write operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     */
    function readi32(b: buffer, offset: number): number;
    /**
     * - Used to read a string of length ‘count’ from the buffer at specified offset.
     */
    function readstring(b: buffer, offset: number, count: number): string;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 8-bit unsigned integer
     * - [0, 255]
     * - Read and write operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     */
    function readu8(b: buffer, offset: number): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 16-bit unsigned integer
     * - [0, 65,535]
     * - Read and write operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     */
    function readu16(b: buffer, offset: number): number;
    /**
     * - Used to read the data from the buffer by reinterpreting bytes at the offset as the type in the argument and converting it into a number.
     * - 32-bit unsigned integer
     * - [0, 4,294,967,295]
     * - Read and write operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     */
    function readu32(b: buffer, offset: number): number;
    /**
     * - Returns the buffer data as a string.
     */
    function tostring(b: buffer): string;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 32-bit floating-point number
     * - Single-precision IEEE 754 number
     * - Write and read operations use the little endian byte order.
     * - Values that are out-of-range will take less significant bits of the full number. For example, writing 43,981 (0xabcd) using writei8 function will take 0xcd and interpret it as an 8-bit signed number -51. It is still recommended to keep all numbers in range of the target type.
     * - Results of converting special number values (inf/nan) to integers are platform-specific.
     */
    function writef32(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 64-bit floating-point number
     * - Double-precision IEEE 754 number
     * - Write and read operations use the little endian byte order.
     * - Values that are out-of-range will take less significant bits of the full number. For example, writing 43,981 (0xabcd) using writei8 function will take 0xcd and interpret it as an 8-bit signed number -51. It is still recommended to keep all numbers in range of the target type.
     * - Results of converting special number values (inf/nan) to integers are platform-specific.
     */
    function writef64(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 8-bit signed integer
     * - [-128, 127]
     * - Write and read operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     * - When writing integers, the number is converted using bit32 library rules.
     */
    function writei8(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 16-bit signed integer
     * - [-32,768, 32,767]
     * - Write and read operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     * - When writing integers, the number is converted using bit32 library rules.
     */
    function writei16(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 32-bit signed integer
     * - [-2,147,483,648, 2,147,483,647]
     * - Write and read operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     * - When writing integers, the number is converted using bit32 library rules.
     */
    function writei32(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data from a string into the buffer at a specified offset.
     * - If an optional ‘count’ is specified, only ‘count’ bytes are taken from the string.
     * - Count cannot be larger than the string length.
     */
    function writestring(b: buffer, offset: number, value: string, count?: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 8-bit unsigned integer
     * - [0, 255]
     * - Write and read operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     * - When writing integers, the number is converted using bit32 library rules.
     */
    function writeu8(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 16-bit unsigned integer
     * - [0, 65,535]
     * - Write and read operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     * - When writing integers, the number is converted using bit32 library rules.
     */
    function writeu16(b: buffer, offset: number, value: number): void;
    /**
     * - Used to write data to the buffer by converting the number into the type in the argument and reinterpreting it as individual bytes.
     * - 32-bit unsigned integer
     * - [0, 4,294,967,295]
     * - Write and read operations use the little endian byte order.
     * - Integer numbers are read and written using two’s complement representation.
     * - When writing integers, the number is converted using bit32 library rules.
     */
    function writeu32(b: buffer, offset: number, value: number): void;
}