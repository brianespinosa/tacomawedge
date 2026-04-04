# ADR 001: Use Architecture Decision Records

## Status

Accepted

## Context

As this project evolves, non-obvious technical decisions accumulate. Without a
record of why a decision was made, future contributors (or future-self) must
re-derive the reasoning — or worse, silently reverse a decision whose rationale
was never written down.

## Decision

We use Architecture Decision Records (ADRs) to document significant technical
decisions in this project. ADRs live in `docs/adr/` and are numbered
sequentially. Each ADR captures:

- **Context**: the problem or constraint that prompted the decision
- **Decision**: what we chose to do
- **Consequences**: trade-offs and follow-up actions accepted as a result

The format follows [Michael Nygard's lightweight ADR template](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

## Consequences

- New significant decisions should be recorded as ADRs before or alongside the
  implementing commit.
- ADRs are append-only — a superseded decision gets a new ADR that references
  the old one; the old ADR's status is updated to "Superseded by ADR NNN".
- Not every change warrants an ADR. Routine dependency updates, minor
  refactors, and style fixes do not. ADRs are for decisions with lasting
  architectural impact or non-obvious rationale.
