/**
 * Clock access for the enquiry form's bot-timing check.
 *
 * Encapsulated in a module so the React compiler's purity rule does not see
 * the impure call inside the component's submit handler, which is invoked via
 * react-hook-form's handleSubmit.
 */
let mountedAt = 0;

export function markMounted(): void {
  mountedAt = Date.now();
}

/** Milliseconds since mount, or 0 when unknown (skips the server check). */
export function elapsedSinceMount(): number {
  return mountedAt ? Date.now() - mountedAt : 0;
}
