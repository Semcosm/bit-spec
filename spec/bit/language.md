# Bit language

**Status:** Normative working draft; acceptance pending

## Scope and notation

This document defines the source-level notation shared by Bit implementations. It defines the shape of a module and the constructs that later documents assign meaning to. A conforming implementation MUST read source as UTF-8, preserve source locations for diagnostics, and reject malformed input rather than guessing an alternate parse.

The examples use four spaces for indentation, although indentation is not significant. A line comment starts with `//`; a nested block comment starts with `/*` and ends with `*/`. Comments are removed before parsing. Identifiers are Unicode letters or `_`, followed by Unicode letters, decimal digits, or `_`; identifiers are compared by Unicode scalar value after NFC normalization.

## Modules

A source file contains one module. The smallest module is:

```bit
module example

pub fn main() -> i32 {
    0
}
```

The module declaration MUST be the first non-comment item. Its dotted name identifies the module for imports and diagnostics. A module may contain `import`, `type`, `const`, `let`, `var`, `fn`, `struct`, and `enum` declarations. `pub` makes a declaration visible to importing modules; declarations without `pub` are private.

An import has the form `import name.path [as alias]`. Imports are resolved before type checking and do not execute initialization. The [module system](module-system.md) defines visibility, cycles, and initialization order.

## Lexical forms

The reserved words are:

```text
as  break  const  else  enum  false  fn  if  import  let  loop
match  module  mut  pub  return  struct  true  type  unsafe  var  while
```

Integer literals are base-10 by default and may use `_` separators; `0x`, `0o`, and `0b` select hexadecimal, octal, and binary. Integer suffixes are type-directed (`u8`, `i32`, and so on). String literals use double quotes and the escapes `\\`, `\"`, `\n`, `\r`, `\t`, and `\u{...}`. A character literal uses single quotes and denotes one Unicode scalar value.

## Declarations and expressions

Declarations are expression-oriented. A function body is a block whose value is the final expression, or `()` when the final statement is terminated with `;`:

```bit
fn square(x: i32) -> i32 {
    x * x
}

fn classify(x: i32) -> text {
    if x < 0 { "negative" } else { "non-negative" }
}
```

The grammar below is intentionally compact; precedence is part of the language contract.

```ebnf
module      = "module", path, { item } ;
item        = import | declaration ;
import      = "import", path, [ "as", identifier ] ;
declaration = [ "pub" ], ( type_decl | const_decl | binding | function ) ;
function    = "fn", identifier, "(", [ parameters ], ")", [ "->", type ], block ;
binding     = ( "let" | "var" ), [ "mut" ], pattern, [ ":", type ], "=", expression ;
block       = "{", { statement }, [ expression ], "}" ;
```

An implementation MUST preserve left-to-right operand evaluation. Operators and statement forms not listed by this specification are unavailable unless enabled by a versioned language extension.

## Diagnostics and errors

Diagnostics have a severity, stable code, primary source span, and human-readable message. A successful compilation emits no error diagnostics. Implementations MAY add notes and suggestions, but tools consuming diagnostics MUST be able to rely on the code and span. Runtime failure behavior is defined by [semantics](semantics.md), not by diagnostic wording.

## Versioning

Every module is checked under a language profile. A profile names the major language version and enabled extensions. An implementation MUST report the profile when serializing an artifact. New syntax is introduced only through the RFC process and cannot change the parse of a program accepted by an earlier stable profile.
