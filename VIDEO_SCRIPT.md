# YouTube Script — Accessible Form Code-Along

> **Format:** Loose script. Italics = stage direction / screen action. Brackets = optional ad-lib notes.

---

## INTRO

Today we're doing a code-along where we build an accessible form in React — and I mean _really_ accessible. We're going to cover labeling, grouping, hints, error handling, focus management, navigating via screen reader — the whole thing. We'll go through the thirteen rules from the W3C WAI spec and then implement every single one of them.

The goal is to take this starter form I've already built and get it working the way a finished accessible form. If you want to follow along, pull up the repo [gesture to screen / link in description].

But before we write a single line of code, we need to go over the rules and requirements.

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

React's `useId()` hook generates a unique, stable ID per component instance. Use it every time you need to wire up a label-to-input relationship. In our form today, this is the first thing we'll add.

---

### Rule 3 — Wrap radio & checkbox groups in `<fieldset>` / `<legend>`

_[Expand accordion]_

When you have a group of radios or checkboxes, each individual option isn't enough context on its own. "Developer" — developer _what_? The `<fieldset>` wraps the group and the `<legend>` provides the group name. Screen readers announce the legend alongside each option: "Your Role — Developer, radio button, 1 of 4."

Our form has a "Your Role" radio group. Right now it's just floating options — we already have the fieldset, but we need to make sure the ARIA is wired correctly when there's a validation error.

---

### Rule 4 — Group related text fields with `role="group"`

_[Expand accordion]_

This is for _text_ inputs that belong together — think Shipping Address vs. Billing Address. Both have a "Name" field, a "Street" field. Without grouping, a screen reader user hears two "Name" fields with no way to distinguish them.

You add `role="group"` to a wrapper div and `aria-labelledby` pointing to a heading inside it. Our form today doesn't use this pattern, but it's in the rules so it's worth understanding.

---

### Rule 5 — Use `<optgroup>` in `<select>` for grouped options

_[Expand accordion]_

If you have a `<select>` with a long list — say, courses grouped by semester — `<optgroup>` creates labeled sections inside the dropdown. Screen readers announce the group label before each option within it.

Again, our form doesn't have a select today, but file this one away — it's easy to forget and easy to implement.

---

### Rule 6 — Place overall instructions BEFORE the `<form>`

_[Expand accordion]_

This one is subtle. Screen readers have two modes: browse mode and forms mode. In forms mode, they skip over non-interactive content — meaning anything inside your `<form>` that isn't an input, label, or button might get jumped over entirely.

So if you have instructions like "fields marked * are required" or "email must be in the format you@example.com" — put them *outside and above\* the form element. That way they're always readable regardless of mode.

In the form we will be building, the instructions div will sit above the `<form>` tag. That's intentional.

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

Both are necessary. `aria-invalid` alone doesn't tell the user what's wrong. `aria-describedby` alone doesn't mark the field as invalid.

---

### Rule 11 — Announce outcomes with live regions

_[Expand accordion]_

After a successful submit, the UI changes — maybe you show a "Registered successfully!" message. But if focus didn't move there, screen readers won't know it happened.

Live regions fix this. `role="status"` with `aria-live="polite"` will announce content changes when the screen reader isn't busy with something else — perfect for success messages. `role="alert"` with `aria-live="assertive"` interrupts immediately — reserved for urgent things like "session expired."

In our form, the success state renders into a `role="status"` div and gets announced automatically.

---

### Rule 12 — Custom controls need `role` + `aria` state + keyboard

_[Expand accordion]_

Sometimes a native element won't cut it — you need a custom toggle switch, a star rating, a fancy combobox. The rule is: whatever behavior a native control provides, you must replicate it manually.

That means: a `role` attribute so screen readers know what type of control it is, the appropriate `aria-checked` / `aria-selected` / `aria-expanded` state, and keyboard handlers for the expected keys (Space, Enter, Arrow keys).

This is the hardest rule to get right, but the pattern is always the same: role + state + keyboard.

---

### Rule 13 — Never rely on color alone for errors

_[Expand accordion]_

Red border on an invalid field = invisible to colorblind users. Color is one signal, not the only one.

Best practice is three signals: an icon (like ⚠), error text, and color. For required fields, that means the visible asterisk _plus_ an sr-only "(required)" span so screen reader users also get the message.

---

## TRANSITION TO CODE

Alright — thirteen rules. That's what we're building to. Now let's open up the code.

_[Switch to editor, open `AccessibleForm.tsx`]_

This is our starting point. We've got the structure — fieldsets, labels, inputs — but none of the accessibility wiring. No `useId`, no state, no validation, no ARIA attributes. It's a skeleton.

And over here is our goal: `ValidationDemo.tsx`. This is what we're coding toward.

Let's start at rule one and work our way down.

_[Begin coding]_

---

## CODING ORDER

> Bullet points = talking points to riff on, not lines to read.

---

### Step 1 — `useId()` for every field _(Rule 2)_

- Import `useId` from React
- One call per field: `nameId`, `emailId`, `roleId`, `bioId`, `agreeId`
- Replace the hardcoded `id="name"`, `id="email"`, etc. on each input with the hook values
- Update `htmlFor` on each `<label>` to match — `htmlFor={nameId}`, `htmlFor={emailId}`, etc.
- **Say:** IDs are the spine of everything that follows — labels, hints, errors all hang off them. Do this first so you're not refactoring mid-stream.
- **Say:** And notice we're updating both sides — the `id` on the input AND the `htmlFor` on the label. That's the connection that makes the label actually work. If they don't match, the label is just decorative text.
- **Say:** And like we established in the rules — if this component ever renders more than once on a page, `useId()` is what guarantees those IDs stay unique across every instance.

---

### Step 2 — Add state + wire up `onChange` _(prerequisite for validation)_

- Add `useState` for `values` (name, email, role, bio, agree), `errors`, `submitted`
- Add `value` / `checked` props to every input
- Add `onChange` handlers
- **Say:** We're converting this to a controlled form. Nothing fancy yet — just wiring up the values so we have something to validate against.

---

### Step 3 — `validate()` function + `handleSubmit` _(Rules 8, 10)_

- Write `validate()` — returns a `Record<string, string>` of field key → error message
- **Say:** `Record<string, string>` is just TypeScript's way of saying "an object where every key is a string and every value is a string." The keys are field names like `"name"` or `"email"`, and the values are the error messages. If a field passes validation, it simply won't appear in the object at all.
- Write `handleSubmit` — calls `validate()`, sets errors, gates on `Object.keys(errs).length === 0`
- Add `onSubmit={handleSubmit}` and `noValidate` to the `<form>`
- **Say:** `noValidate` turns off browser-native validation bubbles so we control the whole experience. Our `validate` function is the single source of truth for what's required and what's valid.
- **Say:** The reason we don't want the browser's built-in validation is that those error bubbles are not accessible — they're inconsistent across browsers, they don't work with all screen readers, and we have no control over how or where they appear. By owning validation ourselves, we can follow all thirteen of those rules we just went through.

---

### Step 4 — Error summary + programmatic focus _(Rule 8)_

- Import `useRef`, add `errorSummaryRef`
- Render the summary conditionally on `hasErrors` — `tabIndex={-1}`, heading, `<ul>` of links to each field anchor
- In `handleSubmit`, call `setTimeout(() => errorSummaryRef.current?.focus(), 50)` on error
- **Say:** This is the biggest accessibility win in the whole form. Without it, a screen reader user submits, nothing seems to happen, and they have no idea where the errors are. The `setTimeout` is a small hack — we need the DOM to render the summary before we focus it.
- **Show:** submit the empty form, tab around, demonstrate focus landing on the summary.

---

### Step 5 — Instructions block above the form _(Rule 6)_

- Add a `<div>` with a `<ul>` listing the three instructions (required fields, email format, bio optional) _above_ the `<form>` tag
- **Say:** This is the subtle one — screen readers in Forms Mode skip non-interactive content inside the form. Anything you need users to read before they start filling things out has to live outside it.

---

### Step 6 — Extract the `Field` wrapper component _(Rules 1, 7, 13)_

Before we write the component, let's talk about why we're pulling this out at all.

Look at a single field right now — Name, for example. To do it correctly, it needs at least four things: a label linked via `htmlFor` (Rule 1), a hint span with its own `id` so we can point `aria-describedby` at it (Rule 7), an error span with its own `id` for the same reason, and a required marker that's visible to sighted users *and* readable by screen readers — not just an asterisk, but an sr-only "(required)" alongside it (Rule 13).

That's four accessibility requirements per field, and we have three text fields. If we write that structure out individually for each one, we're going to miss something — maybe the hint ID doesn't match, maybe we forget the sr-only text on one of them. And when we come back to add a new field later, we have to remember all four rules again.

The `Field` component is the answer to that. It's not an abstraction for the sake of it — it's a single place that enforces all three rules at once. Every field that goes through it gets a correct label, a wired hint, a wired error, and a proper required marker, automatically. You can't forget them because they're baked in.

- Create `Field` component above `AccessibleForm` — props: `id`, `label`, `hint?`, `error?`, `required?`, `children`
- Inside: renders label with optional required star + sr-only text, optional hint span with `id={id}-hint`, children, optional error span with `id={id}-error`
- Swap the Name, Email, Bio fields to use `<Field>`
- **Say:** We're not building an abstraction for fun — every one of these slots (label, hint, error) has an accessibility job. Putting them in one place means we can't accidentally forget them.

---

### Step 7 — Wire `aria-invalid` + `aria-describedby` on inputs _(Rule 10)_

- On the Name input: `aria-invalid={!!errors.name}`, `aria-describedby` pointing to the error id (and hint id if present)
- Same for Email — combine hint and error ids with a `.filter(Boolean).join(" ")`
- Same for Bio — hint only, no validation
- **Say:** Let's talk about what these two attributes actually do, because they're doing different jobs.

  `aria-invalid` is a boolean flag on the input itself. When it's `true`, the screen reader announces the field as invalid the moment focus lands on it — before reading anything else. It doesn't say what's wrong, just that something is. That's its only job.

  `aria-describedby` is how you supply the actual description. You point it at the `id` of another element — in our case the error message span — and the screen reader reads that element's text after it reads the label. So the full announcement ends up being: label, then "invalid entry," then the error text. All three pieces, in order.

  The reason you need both: `aria-invalid` alone tells the user something is wrong but not what. `aria-describedby` alone reads the error text but doesn't mark the field as invalid — some screen readers won't even announce it until the user navigates to the description explicitly.

  One more thing on Email — notice we're joining the hint id and the error id together in `aria-describedby` with a space. You can pass multiple ids, space-separated, and the screen reader reads each referenced element in order. So on Email you get: label → invalid → hint text → error text. That full context is what you want.

---

### Step 8 — Radio fieldset error state _(Rules 3, 10)_

- Add error class to the `<fieldset>` and `<legend>` when `errors.role` is set
- Render the error message span inside the fieldset
- Add `aria-describedby={errors.role ? \`${roleId}-error\` : undefined}` to each radio input
- **Say:** Radios are a special case — `aria-invalid` lives on the fieldset's id anchor, and each individual radio points to the group-level error via `aria-describedby`.

---

### Step 9 — Required field markers _(Rule 13)_

- In the `Field` component: `<span aria-hidden="true">*</span>` + `<span className="sr-only"> (required)</span>` when `required` is true
- Pass `required` prop to Name, Email, and the role fieldset legend (manually add the stars there)
- On the agree checkbox label: add the star + agree error span below the row
- **Say:** The asterisk is a visual convention, but to a screen reader it's just punctuation. The sr-only text is what actually communicates "this field is required" programmatically.

---

### Step 10 — Success state with live region _(Rule 11)_

- Render the success `<div role="status" aria-live="polite">` block when `submitted === true`
- Add the Reset button that clears state
- **Say:** `role="status"` is a live region — when its content changes, screen readers announce it automatically without needing a focus shift. That's how we handle async outcomes: render into a live region instead of trying to focus a transient message.
- **Show:** fill out the form correctly, submit, hear the announcement.

---

### Wrap-up

_[Switch back to browser, run through the form with a screen reader]_

- Tab through empty form — hear labels, hints, required markers
- Submit empty — hear focus jump to error summary, navigate links to fields
- Fill in and submit — hear success announcement

Thirteen rules, one form, fully accessible. If you want to go deeper on any of these patterns, the `/tutorials/forms` page has the full WAI checklist — link in the description.

_[Outro]_
