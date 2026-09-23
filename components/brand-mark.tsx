/** Approved open-square identity; decorative inside an accessible brand link. */
export function BrandMark() {
  return <span className="op-brand-mark" aria-hidden="true">
    <img className="op-brand-dark" src="/op-open-square-dark.png" alt=""/>
    <img className="op-brand-light" src="/op-open-square-light.png" alt=""/>
  </span>;
}
