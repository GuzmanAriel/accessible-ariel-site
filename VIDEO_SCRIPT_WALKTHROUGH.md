# YouTube Script — Accessible Form Code Walkthrough (Alternate)

> **Format:** Loose script. Italics = stage direction / screen action. Brackets = optional ad-lib notes.

---

## INTRO

Today we're doing a deep-dive into accessible forms in React — and I mean _really_ accessible. We're going to cover labeling, grouping, hints, error handling, focus management, navigating via screen reader — the whole thing.

Instead of building it live, I've got a finished form right here and we're going to walk through every decision in it. I'll show you exactly where each accessibility rule shows up in the code and _why_ it's written the way it is — because the what is easy to copy, the why is what actually sticks.

But before we look at a single line of code, we need to go over the rules and requirements that drove every one of those decisions.

---

## THE RULES — /tutorials/forms

_[Navigate to the `/tutorials/forms` page on screen]_

This page lives on my site under Tutorials → Forms. Everything here is pulled from the W3C WAI Forms Tutorial — it's the authoritative spec for accessible forms. If you ever wonder "wait, do I actually need to do this?" — this is where you look it up.

There are thirteen rules. Let's go through them one by one.

---

### Rule 1 — Use `<label>` with `htmlFor` — never placeholder-only

_[Expand accordion]_

The `<label>` element gives an input its _accessible name_ — the text a screen reader announces when the field receives focus. You link it to the input with `htmlFor` matching the input's `id`.

The bad version is relying on `placeholder`. Placeholder text disappears the moment a user starts typing. Visually it's fine, programmatically it's a dead end — assistive tech doesn't treat it as a label.

Rule of thumb: every single input needs a visible label. No exceptions.

---

### Rule 2 — Use `useId()` — never hardcode IDs

_[Expand accordion]_

This one trips up a lot of React developers. You write `id="email"` on an input, everything works, you move on. Then the same component renders twice on the page and now you have two elements with the same `id` — which breaks the label association and is invalid HTML.

React's `useId()` hook generates a unique, stable ID per component instance. Use it every time you need to wire up a label-to-input relationship.

---

### Rule 3 — Wrap radio & checkbox groups in `<fieldset>` / `<legend>`

_[Expand accordion]_

When you have a group of radios or checkboxes, each individual option isn't enough context on its own. "Developer" — developer _what_? The `<fieldset>` wraps the group and the `<legend>` provides the group name. Screen readers announce the legend alongside each option: "Your Role — Developer, radio button, 1 of 4."

Our form has a "Your Role" radio group. We'll see exactly how the error state hooks into it when we get to the code.

---

### Rule 4 — Group related text fields with `role="group"`

_[Expand accordion]_

Not in our form today, but the pattern is: wrap related text inputs in a `div` with `role="group"` and `aria-labelledby` pointing at a heading inside it — so screen readers can distinguish two "Name" fields that belong to different sections.

---

### Rule 5 — Use `<optgroup>` in `<select>` for grouped options

_[Expand accordion]_

No select in our form, but file this one away: if you have a long dropdown, wrap related options in `<optgroup>` with a label — screen readers announce the group name before each option inside it.

---

### Rule 6 — Place overall instructions BEFORE the `<form>`

_[Expand accordion]_

This one is subtle. Screen readers have two modes: browse mode and forms mode. In forms mode, they skip over non-interactive content — meaning anything inside your `<form>` that isn't an input, label, or button might get jumped over entirely.

So if you have instructions like "fields marked * are required" or "email must be in the format you@example.com" — put them *outside and above\* the form element. That way they're always readable regardless of mode.

In the form we'll look at, the instructions block sits above the `<form>` tag. That's intentional.

---

### Rule 7 — Link hints with `aria-describedby`

_[Expand accordion]_

A hint is extra context below a field — something like "We'll never share your email." It's visible, but screen readers won't announce it unless you explicitly connect it to the input.

You give the hint a unique `id`, then add `aria-describedby` to the input pointing at that id. When the field is focused, the screen reader reads the label first, then the hint. Multiple ids can be space-separated if you have both a hint and an error.

---

### Rule 8 — Show error summary & move focus to it on submit

_[Expand accordion]_

This is one of the biggest ones for keyboard and screen reader users. When a user submits a form with errors, the page content changes — but focus is still sitting on the submit button at the bottom. A sighted user can scroll up and see red boxes. A keyboard or screen reader user has no idea anything changed.

The fix: render a visible error summary at the top of the form, give it `tabIndex={-1}` so it can receive programmatic focus, and then call `.focus()` on it after validation runs. The screen reader immediately announces the summary.

Bonus: make each error in the summary a link that jumps to the invalid field.

---

### Rule 9 — Scroll to & focus the first invalid field

_[Expand accordion]_

This pairs with Rule 8. After focusing the error summary for screen reader users, also scroll the first invalid field into view for sighted keyboard users. They see where the problem is without having to hunt.

You grab refs for each field and use `scrollIntoView({ behavior: "smooth", block: "center" })` on whichever ref corresponds to the first error.

---

### Rule 10 — Set `aria-invalid` and link error via `aria-describedby`

_[Expand accordion]_

Once a field has an error, you need to signal it two ways: `aria-invalid={true}` tells the screen reader the field is in an error state (it announces "invalid entry" on focus), and `aria-describedby` pointing to the error message element tells it what the error actually is.

Both are necessary. `aria-invalid` alone doesn't tell the user what's wrong. `aria-describedby` alone doesn't mark the field as invalid — some screen readers won't even announce it until the user navigates to the description explicitly.

---

### Rule 11 — Announce outcomes with live regions

_[Expand accordion]_

After a successful submit, the UI changes — maybe you show a "Registered successfully!" message. But if focus didn't move there, screen readers won't know it happened.

Live regions fix this. `role="status"` with `aria-live="polite"` will announce content changes when the screen reader isn't busy with something else — perfect for success messages. `role="alert"` with `aria-live="assertive"` interrupts immediately — reserved for urgent things like "session expired."

---

### Rule 12 — Custom controls need `role` + `aria` state + keyboard

_[Expand accordion]_

Not in this form, but the rule is always the same: if you build a custom toggle, combobox, or rating widget, you have to manually provide a `role`, the matching ARIA state (`aria-checked`, `aria-expanded`, etc.), and keyboard handlers — whatever the native element would have given you for free.

---

### Rule 13 — Never rely on color alone for errors

_[Expand accordion]_

Red border on an invalid field = invisible to colorblind users. Color is one signal, not the only one.

Best practice is three signals: an icon (like ⚠), error text, and color. For required fields, that means the visible asterisk _plus_ an sr-only "(required)" span so screen reader users also get the message.

---

## TRANSITION TO CODE

Alright — thirteen rules. Now let's look at how they all land in actual code.

_[Switch to editor, open `AccessibleForm.tsx`]_

This is the finished form — everything we just talked about is implemented here. Rather than building it from scratch, I want to walk through it piece by piece and show you exactly where each rule shows up and why we wrote it the way we did.

---

## THE `Field` WRAPPER COMPONENT

_[Scroll to top of file — `Field` component, lines 5–42]_

The first thing in this file isn't the form itself — it's a helper component called `Field`. Let's start here because it drives most of the decisions below.

Every text input in this form needs at least four things to be accessible: a label wired via `htmlFor`, a hint element with its own `id`, an error element with its own `id`, and a required marker that works both visually and for screen readers. That's Rules 1, 7, and 13, every single time.

If you inline all of that per field, you'll miss something — maybe you forget the sr-only text on one field, or the hint `id` doesn't match what `aria-describedby` is pointing at. `Field` solves that by putting all four responsibilities in one place. Every field that goes through it gets all of them, automatically.

Look at the required marker specifically:

```tsx
{
  required && (
    <span aria-hidden="true" className="validation-demo__required-star">
      *
    </span>
  );
}
{
  required && <span className="sr-only"> (required)</span>;
}
```

Two spans, not one. The asterisk has `aria-hidden="true"` because screen readers would just announce "asterisk" — which means nothing. The sr-only span announces "(required)" in plain language. Visual users see the star; screen reader users hear the word. Rule 13 — never color or symbol alone.

The hint and error spans each get a predictable `id`:

```tsx
<span id={`${id}-hint`} ...>
<span id={`${id}-error`} ...>
```

We'll see why that pattern matters when we get to the inputs.

---

## HOOKS AT THE TOP

_[Scroll to `AccessibleForm` function, lines 44–51]_

Five `useId()` calls — one per field. This is Rule 2. IDs are the spine of the whole accessibility graph: labels point at inputs, hints point at inputs, errors point at inputs. If any two IDs collide, the link breaks.

`useId()` guarantees uniqueness per component instance, so if this form ever renders twice on the same page — in a modal and inline, say — you don't get duplicate IDs in the DOM.

We also have two refs:

```tsx
const errorSummaryRef = useRef<HTMLDivElement>(null);
const successRef = useRef<HTMLDivElement>(null);
```

Those are for programmatic focus — we'll hit those in a minute.

---

## VALIDATE + HANDLESUBMIT

_[Scroll to `validate()` and `handleSubmit`, lines 65–91]_

`validate()` returns a `Record<string, string>` — field name to error message. Empty object means the form is valid. No field in the object means that field passed.

`handleSubmit` is where Rules 8 and 9 come together:

```tsx
if (Object.keys(errs).length === 0) {
  setSubmitted(true);
} else {
  setTimeout(() => {
    errorSummaryRef.current?.focus();
  });
}
```

On failure: we set errors into state (which renders the error summary), then immediately focus it. The `setTimeout` with no delay is a small trick — React has to flush the render before the summary div is in the DOM, so we defer by one tick. Without it, `focus()` fires on a node that doesn't exist yet and silently does nothing.

On success: we set `submitted`, which triggers the `useEffect` at line 75:

```tsx
useEffect(() => {
  if (submitted) successRef.current?.focus();
}, [submitted]);
```

That focuses the success block. We'll see why that's enough for screen readers when we get to the success markup.

Also notice `noValidate` on the form element. That disables browser-native validation bubbles. Those bubbles are inconsistent across browsers, don't work reliably with screen readers, and we have zero control over where they appear. We own validation entirely, so we turn the browser's version off.

---

## INSTRUCTIONS BLOCK — ABOVE THE FORM

_[Scroll to the instructions `<div>`, lines 120–135]_

This block sits outside — and before — the `<form>` tag. Rule 6.

Screen readers have two modes: browse mode for reading content, and forms mode for interacting with inputs. In forms mode, they skip non-interactive content inside the form element. Any instructions you put inside `<form>` might get jumped over entirely.

So: instructions live above the form. The "fields marked \* are required" notice, the email format note, the bio character limit — all of it is here, where it's always readable regardless of what mode the screen reader is in.

---

## ERROR SUMMARY

_[Scroll to `hasErrors` block, lines 137–153]_

The error summary only renders when there are errors. Two things make it accessible:

```tsx
<div ref={errorSummaryRef} tabIndex={-1} ...>
```

`tabIndex={-1}` means the div can receive programmatic focus even though it's not a naturally focusable element. Without it, `errorSummaryRef.current?.focus()` does nothing. The screen reader immediately announces the heading — "Please fix 3 errors" — and the user knows exactly where they stand.

Each error in the list is a link:

```tsx
<a href={`#${fieldAnchors[key]}`}>
```

`fieldAnchors` maps field names to the `useId()`-generated IDs on the actual inputs. So "Full name is required" is a real anchor link — click or activate it, focus jumps to the Name field. Keyboard users don't have to hunt.

---

## THE FORM FIELDS

### Name and Email — Rules 1, 7, 10

_[Scroll to the Personal Information fieldset, lines 157–201]_

Name is the simplest case:

```tsx
<Field label="Full Name" id={nameId} required error={errors.name}>
  <input
    id={nameId}
    aria-invalid={!!errors.name}
    aria-describedby={errors.name ? `${nameId}-error` : undefined}
    ...
  />
</Field>
```

`aria-invalid` is the boolean flag — when `true`, the screen reader announces "invalid entry" the moment focus lands on the field. It doesn't say what's wrong, just that something is.

`aria-describedby` supplies the description — it points at the error span's `id`, which `Field` rendered as `${nameId}-error`. So the full announcement is: label, then "invalid entry," then the error text. Both are necessary: `aria-invalid` alone doesn't tell the user what's wrong; `aria-describedby` alone doesn't mark the field as invalid.

Email adds a hint to the mix:

```tsx
aria-describedby={[
  errors.email ? `${emailId}-error` : null,
  `${emailId}-hint`,
]
  .filter(Boolean)
  .join(" ")}
```

`aria-describedby` takes a space-separated list of IDs. When there's an error, both the error ID and the hint ID are in the list. The screen reader reads them in order: label → invalid → hint text → error text. The full context, every time.

---

### Role Fieldset — Rules 3, 10

_[Scroll to the role fieldset, lines 203–241]_

Radio groups get `<fieldset>` and `<legend>` — Rule 3. Without the fieldset, each radio announces "Developer, radio button" with no context. With it, the screen reader announces "Your Role — Developer, radio button, 1 of 4."

When there's an error, the fieldset and legend get error classes for the visual ring, and we render an error span inside the fieldset:

```tsx
{errors.role && (
  <span id={`${roleId}-error`} ...>{errors.role}</span>
)}
```

Each radio input points at that span:

```tsx
aria-describedby={errors.role ? `${roleId}-error` : undefined}
```

This is the radio group equivalent of what we did on the text inputs. The error message is associated at the group level — one span, all four radios point at it.

---

### Agree Checkbox — Rules 10, 13

_[Scroll to the agree block, lines 256–285]_

The checkbox is handled manually rather than through `Field` because the label wraps differently — the link to the terms sits inside the label text, and the required star lives there too.

The error span pattern is identical: `id={agreeId}-error`, and the input has `aria-describedby` pointing at it conditionally. Same rules, same wiring.

---

## SUCCESS STATE — Rule 11

_[Scroll to the submitted block, lines 103–119]_

When the form submits successfully, we render this:

```tsx
<div ref={successRef} tabIndex={-1} className="validation-demo__success">
  ...
</div>
```

And the `useEffect` we saw earlier focuses it. The content change is announced because focus moved there — the screen reader reads whatever is in the focused element.

For a more robust live-region approach, you could also add `role="status" aria-live="polite"` — that would announce even without a focus shift, which matters if you're handling async submissions where you don't want to take focus away. For a synchronous form like this, focus is enough.

---

## WRAP-UP

_[Switch to browser]_

Let's see it run.

_[Tab through the empty form]_

Notice: labels, hints, and "(required)" are all announced in order on each field.

_[Submit empty]_

Focus jumps to the error summary. Tab into the links — each one navigates to its field.

_[Fill out correctly and submit]_

Focus goes to the success block and it's announced immediately.

Thirteen rules, one form, nothing missing. The code is in the repo — link in the description. If you want to dig into any specific rule, the `/tutorials/forms` page has the full WAI checklist with everything cross-referenced.

_[Outro]_
