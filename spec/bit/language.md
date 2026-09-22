# Bit language

**Status:** Normative working draft; acceptance pending

## Bit-B0 profile

Bit-B0 is the first bounded source-language profile. It is intended to be small enough for a seed parser and complete enough to lower into BIR-B0. A conforming Bit-B0 implementation MUST accept the constructs listed in this document and MUST reject constructs outside the profile instead of assigning them implementation-defined meaning.

Bit-B0 includes modules and imports, type aliases, structs, enums, constants, bindings, functions, generic parameters with named constraints, blocks, conditional and match expressions, loop and while, explicit ownership and borrowing syntax, calls, indexing, field access, assignment, and the operators in the precedence table below. Effects use the names pure, alloc, io, async, and unsafe.

The following are outside Bit-B0: macros and preprocessing, closures, for loops, async functions and await expressions, trait or constraint implementations, operator overloading, attributes, reflection, variadic functions, implicit conversions that are not listed by the type specification, and raw-pointer syntax. A later profile may add them only through the RFC process.

Bit-B0 does not define a standard library. Names such as `Option<T>`, `Result<T, E>`, `Box<T>`, `Send`, and `Sync` are available only when a selected library or runtime profile declares them.

## Scope and notation

This document defines source tokens and grammar. semantics.md, type-system.md, and memory-model.md assign meaning to the accepted forms. A conforming implementation MUST decode source as UTF-8, preserve source locations, and reject malformed input rather than guessing an alternate parse.

The grammar uses this EBNF notation:

- juxtaposition means sequence;
- | separates alternatives;
- `{ X }` means zero or more repetitions of X;
- `[ X ]` means an optional X;
- quoted text is a literal token;
- an uppercase name such as IDENTIFIER refers to a lexical token.

Whitespace, including newlines, is not significant except that it separates adjacent tokens. The examples use four spaces for indentation.
`EOF` is an end-of-input sentinel, not source text. Names such as `unicode_letter`, `HEX_DIGIT`, and `escape_sequence` are lexical character classes or token definitions supplied by the lexical rules below.

## Lexical structure

Comments are removed before parsing. A line comment starts with // and ends at the next newline. A block comment starts with /*, ends with the matching */, and may be nested.

An identifier starts with a Unicode letter, or with `_` followed by a letter or digit, and continues with Unicode letters, decimal digits, or `_`. Identifiers are normalized to Unicode NFC and compared by Unicode scalar value. The exact token `_` is reserved for the wildcard pattern. A keyword is never an identifier. The Bit-B0 keywords are:

~~~text
as async alloc bool break char const else effects enum f32 f64 false fn
i8 i16 i32 i64 i128 if import io let loop match module move mut never
own pub pure return share slice struct text true type u8 u16 u32 u64
u128 unsafe var while
~~~

The longest valid token is selected. The punctuation and operators used by Bit-B0 are:

~~~text
( ) { } [ ] , : ; . :: -> => + - * / % ! && ||
= == != < <= > >= & _ '
~~~

Integer literals are base 10 by default. Prefixes 0x, 0o, and 0b select hexadecimal, octal, and binary. An underscore may separate digits but may not occur at the beginning, end, or twice in a row. An integer may carry a type suffix such as i32 or u64. A floating literal has digits on both sides of . and may carry f32 or f64; scientific notation is not in Bit-B0.

String literals use double quotes and the escapes backslash, quote, newline, carriage return, tab, and Unicode scalar escape. A character literal uses single quotes and denotes exactly one Unicode scalar value.

The lexical forms are summarized below. The implementation MUST reject a token that does not match one of these forms.

~~~ebnf
IDENTIFIER       = unicode_letter, { unicode_letter | decimal_digit | "_" }
                 | "_", ( unicode_letter | decimal_digit ),
                   { unicode_letter | decimal_digit | "_" } ;
WILDCARD         = "_" ;
MODULE_PATH      = IDENTIFIER, { ".", IDENTIFIER } ;
LIFETIME         = "'", IDENTIFIER ;
INTEGER          = ( DECIMAL | "0x", HEX_DIGIT, { [ "_" ], HEX_DIGIT }
                   | "0o", OCTAL_DIGIT, { [ "_" ], OCTAL_DIGIT }
                   | "0b", BINARY_DIGIT, { [ "_" ], BINARY_DIGIT } ),
                   [ INTEGER_SUFFIX ] ;
INTEGER_SUFFIX   = "i8" | "i16" | "i32" | "i64" | "i128"
                 | "u8" | "u16" | "u32" | "u64" | "u128" ;
FLOAT            = DECIMAL, ".", DECIMAL, [ FLOAT_SUFFIX ] ;
FLOAT_SUFFIX     = "f32" | "f64" ;
STRING           = '"', { STRING_CHAR | ESCAPE }, '"' ;
CHARACTER        = "'", ( unicode_scalar_except_quote_backslash_control | ESCAPE ), "'" ;
DECIMAL          = decimal_digit, { [ "_" ], decimal_digit } ;
HEX_DIGIT        = decimal_digit | "A" | "B" | "C" | "D" | "E" | "F"
                 | "a" | "b" | "c" | "d" | "e" | "f" ;
OCTAL_DIGIT      = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" ;
BINARY_DIGIT     = "0" | "1" ;
STRING_CHAR      = unicode_scalar_except_quote_backslash_control ;
ESCAPE           = escape_sequence ;
~~~

The exact token `_` is `WILDCARD`, not an identifier. The names unicode_letter, unicode_scalar, unicode_scalar_except_quote_backslash_control, decimal_digit, HEX_DIGIT, OCTAL_DIGIT, and BINARY_DIGIT denote the corresponding Unicode or ASCII character classes. `escape_sequence` is one of the source spellings `\\`, `\"`, `\n`, `\r`, `\t`, or `\u{H}` where `H` contains one to six hexadecimal digits; the decoded value MUST be at most `0x10FFFF` and MUST NOT be a surrogate. A numeric suffix is part of the literal token and may not be separated from it by whitespace.

## Source grammar

A source file contains exactly one module declaration followed by zero or more items. A module declaration may omit its trailing semicolon for compatibility with the examples in this specification. All other declaration terminators shown below are required.

~~~ebnf
SOURCE_FILE       = MODULE_DECL, { ITEM }, EOF ;
MODULE_DECL       = "module", MODULE_PATH, [ ";" ] ;
ITEM              = IMPORT_ITEM | TYPE_ITEM | CONST_ITEM
                  | BINDING_ITEM | FUNCTION_ITEM ;
IMPORT_ITEM       = "import", MODULE_PATH, [ "as", IDENTIFIER ], ";" ;

TYPE_ITEM         = TYPE_ALIAS | STRUCT_DECL | ENUM_DECL ;
TYPE_ALIAS        = [ "pub" ], "type", IDENTIFIER, [ GENERIC_PARAMS ],
                    "=", TYPE, ";" ;
STRUCT_DECL       = [ "pub" ], "struct", IDENTIFIER, [ GENERIC_PARAMS ],
                    "{", [ FIELD, { ",", FIELD }, [ "," ] ], "}" ;
ENUM_DECL         = [ "pub" ], "enum", IDENTIFIER, [ GENERIC_PARAMS ],
                    "{", [ VARIANT, { ",", VARIANT }, [ "," ] ], "}" ;
FIELD             = [ "pub" ], IDENTIFIER, ":", TYPE ;
VARIANT           = IDENTIFIER, [ VARIANT_PAYLOAD ] ;
VARIANT_PAYLOAD   = "(", [ TYPE, { ",", TYPE }, [ "," ] ], ")"
                  | "{", [ FIELD, { ",", FIELD }, [ "," ] ], "}" ;

CONST_ITEM        = [ "pub" ], "const", IDENTIFIER, [ ":", TYPE ],
                    "=", EXPRESSION, ";" ;
BINDING_ITEM      = [ "pub" ], BINDING, ";" ;
FUNCTION_ITEM     = [ "pub" ], "fn", IDENTIFIER, [ GENERIC_PARAMS ],
                    "(", [ PARAMETER, { ",", PARAMETER }, [ "," ] ], ")",
                    [ "->", TYPE ], [ EFFECT_CLAUSE ], BLOCK ;
PARAMETER         = IDENTIFIER, ":", TYPE ;
BINDING           = ( "let" | "var" ), [ "mut" ], PATTERN, [ ":", TYPE ],
                    "=", EXPRESSION ;

GENERIC_PARAMS    = "<", GENERIC_PARAM, { ",", GENERIC_PARAM }, [ "," ], ">" ;
GENERIC_PARAM     = IDENTIFIER, [ ":", CONSTRAINT, { "+", CONSTRAINT } ] ;
CONSTRAINT        = IDENTIFIER ;
EFFECT_CLAUSE     = "effects", "{", [ EFFECT, { ",", EFFECT }, [ "," ] ], "}" ;
EFFECT            = "pure" | "alloc" | "io" | "async" | "unsafe" ;
~~~

pub on a struct, enum, type, constant, binding, or function exports the declaration. Field visibility is checked when a field is accessed through a public type. A function with no explicit return type returns (). A function with no effect clause has the effect set `{pure}`.

## Complete Bit-B0 example

The following module uses declarations, an enum with tuple and struct variants, ownership, borrowing, field assignment, and a match expression.

~~~bit
module demo;

pub type Count = i32;

pub struct Counter {
    pub value: i32,
}

pub enum Step {
    Stay,
    Add(i32),
    Set { value: i32 },
}

pub const LIMIT: i32 = 10;

pub fn advance(current: own Counter, step: Step) -> own Counter effects { pure } {
    let mut next: own Counter = current;
    match step {
        Step::Stay => next,
        Step::Add(delta) => {
            next.value = next.value + delta;
            next
        },
        Step::Set { value } => {
            next.value = value;
            next
        },
    }
}

pub fn read(current: &Counter) -> i32 {
    current.value
}
~~~

## Types

The source forms for Bit-B0 types are:

~~~ebnf
TYPE              = [ OWNERSHIP ], TYPE_ATOM ;
OWNERSHIP         = "own" | "share" ;
TYPE_ATOM         = "bool" | INTEGER_TYPE | "f32" | "f64" | "char"
                  | "text" | "never" | UNIT_TYPE | TUPLE_TYPE | PAREN_TYPE
                  | "[", TYPE, ";", INTEGER, "]"
                  | "slice", "<", TYPE, ">"
                  | "&", [ LIFETIME ], [ "mut" ], TYPE
                  | "fn", "(", [ TYPE, { ",", TYPE }, [ "," ] ], ")",
                    "->", TYPE, [ EFFECT_CLAUSE ]
                  | IDENTIFIER, [ "<", TYPE, { ",", TYPE }, [ "," ], ">" ] ;
UNIT_TYPE         = "(", ")" ;
TUPLE_TYPE        = "(", TYPE, ",", [ TYPE, { ",", TYPE }, [ "," ] ], ")" ;
PAREN_TYPE        = "(", TYPE, ")" ;
INTEGER_TYPE      = "i8" | "i16" | "i32" | "i64" | "i128"
                  | "u8" | "u16" | "u32" | "u64" | "u128" ;
~~~

The empty tuple `()` is the unit type. `(T)` is a parenthesized type, while a one-element tuple requires a trailing comma as in `(T,)`. The ownership prefix applies to a value type, while `&T` and `&mut T` are borrowed references. The type checker rejects an ownership form that is invalid for the declaration or operation using it.

## Statements and expressions

Expressions are evaluated from left to right. A block contains zero or more statements and may end with one expression without a semicolon. An expression statement always ends with a semicolon.

~~~ebnf
BLOCK             = "{", { STATEMENT }, [ EXPRESSION ], "}" ;
STATEMENT         = LET_STATEMENT | RETURN_STATEMENT | BREAK_STATEMENT
                  | EXPRESSION, ";" ;
LET_STATEMENT     = ( "let" | "var" ), [ "mut" ], PATTERN, [ ":", TYPE ],
                    "=", EXPRESSION, ";" ;
RETURN_STATEMENT  = "return", [ EXPRESSION ], ";" ;
BREAK_STATEMENT   = "break", [ EXPRESSION ], ";" ;

EXPRESSION        = ASSIGNMENT ;
ASSIGNMENT        = LOGICAL_OR, [ "=", ASSIGNMENT ] ;
LOGICAL_OR        = LOGICAL_AND, { "||", LOGICAL_AND } ;
LOGICAL_AND       = EQUALITY, { "&&", EQUALITY } ;
EQUALITY          = ORDERING, { ( "==" | "!=" ), ORDERING } ;
ORDERING          = ADDITIVE, { ( "<" | "<=" | ">" | ">=" ), ADDITIVE } ;
ADDITIVE          = MULTIPLICATIVE, { ( "+" | "-" ), MULTIPLICATIVE } ;
MULTIPLICATIVE    = UNARY, { ( "*" | "/" | "%" ), UNARY } ;
UNARY             = ( "!" | "+" | "-" | "move" ), UNARY
                  | "&", [ "mut" ], UNARY
                  | CAST ;
CAST              = POSTFIX, { "as", TYPE } ;
POSTFIX           = PRIMARY, { "(", [ ARGUMENTS ], ")"
                  | "[", EXPRESSION, "]" | ".", IDENTIFIER } ;
ARGUMENTS         = EXPRESSION, { ",", EXPRESSION }, [ "," ] ;
~~~

The primary expression forms are:

~~~ebnf
PRIMARY           = LITERAL | PATH | PAREN_EXPR | TUPLE_EXPR | ARRAY_EXPR
                  | STRUCT_EXPR | BLOCK | IF_EXPR | MATCH_EXPR
                  | LOOP_EXPR | WHILE_EXPR | UNSAFE_EXPR ;
LITERAL           = INTEGER | FLOAT | STRING | CHARACTER | "true" | "false" ;
PATH              = IDENTIFIER, { "::", IDENTIFIER } ;
PAREN_EXPR        = "(", EXPRESSION, ")" ;
TUPLE_EXPR        = "(", ")"
                  | "(", EXPRESSION, ",", [ EXPRESSION, { ",", EXPRESSION }, [ "," ] ], ")" ;
ARRAY_EXPR        = "[", [ EXPRESSION, { ",", EXPRESSION }, [ "," ] ], "]" ;
STRUCT_EXPR       = PATH, "{", [ FIELD_INIT, { ",", FIELD_INIT }, [ "," ] ], "}" ;
FIELD_INIT        = IDENTIFIER, [ ":", EXPRESSION ] ;

IF_EXPR           = "if", EXPRESSION, BLOCK, [ "else", ( IF_EXPR | BLOCK ) ] ;
MATCH_EXPR        = "match", EXPRESSION, "{", { MATCH_ARM }, "}" ;
MATCH_ARM         = PATTERN, "=>", EXPRESSION, "," ;
LOOP_EXPR         = "loop", BLOCK ;
WHILE_EXPR        = "while", EXPRESSION, BLOCK ;
UNSAFE_EXPR       = "unsafe", BLOCK ;

PATTERN           = WILDCARD | IDENTIFIER | LITERAL | PAREN_PATTERN
                  | TUPLE_PATTERN | PATH_PATTERN | STRUCT_PATTERN ;
PAREN_PATTERN     = "(", PATTERN, ")" ;
TUPLE_PATTERN     = "(", ")"
                  | "(", PATTERN, ",", [ PATTERN, { ",", PATTERN }, [ "," ] ], ")" ;
QUALIFIED_PATH    = IDENTIFIER, "::", IDENTIFIER, { "::", IDENTIFIER } ;
PATH_PATTERN      = QUALIFIED_PATH, [ "(", [ PATTERN, { ",", PATTERN }, [ "," ] ], ")" ] ;
STRUCT_PATTERN    = QUALIFIED_PATH, "{", [ FIELD_PATTERN, { ",", FIELD_PATTERN }, [ "," ] ], "}" ;
FIELD_PATTERN     = IDENTIFIER, [ ":", PATTERN ] ;
~~~

An identifier in a pattern introduces a new binding. Enum variant patterns MUST use a qualified path such as `Step::Add`; a bare identifier is always a new binding. A match must be exhaustive under the type system. Tuple and struct variant patterns use the constructor path followed by their payload pattern, and every match arm ends with a comma. `if`, `match`, `loop`, and `while` are expressions; `break` may carry the value of a loop expression.

## Operator precedence

Operators bind from highest precedence to lowest precedence as follows. Operators on one row associate left-to-right, except assignment, which associates right-to-left.

| Precedence | Operators |
| --- | --- |
| 10 | calls, indexing, field access |
| 9 | casts `as` |
| 8 | unary `!`, `+`, `-`, `move`, borrow `&` |
| 7 | `*`, `/`, `%` |
| 6 | `+`, `-` |
| 5 | `==`, `!=`, `<`, `<=`, `>`, `>=` |
| 4 | `&&` |
| 3 | `||` |
| 1 | assignment = |

Parentheses may group any expression and override precedence. Operator meaning, overflow, short-circuiting, and valid operand types are defined by semantics.md and type-system.md.

## Diagnostics and versioning

Diagnostics have a severity, stable code, primary source span, and human-readable message. A successful compilation emits no error diagnostics. Implementations MAY add notes and suggestions, but tools consuming diagnostics MUST be able to rely on the code and span.

Every module is checked under a language profile. The profile identifier and enabled extensions are recorded in every serialized artifact. New syntax is introduced only through the RFC process and cannot change the parse of a program accepted by an earlier stable profile.

The Bit-B0 parser should use stable diagnostic classes for invalid UTF-8, unterminated comments or literals, unknown tokens, malformed declarations, unexpected tokens, and invalid profile syntax. The exact numeric codes will be fixed when the first conformance fixture set is accepted.
