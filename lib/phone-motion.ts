/** A bounded, reversible turn while the phone crosses the viewport.
 * Reach +/-45 degrees during the central 40% of the viewport crossing,
 * while most of the device is still visible, rather than only off-screen.
 */
export function phoneScrollPose(top: number, height: number, viewport: number) {
  const distance = Math.max(1, viewport + height);
  const crossing = (viewport - top) / distance;
  const progress = Math.min(1, Math.max(0, (crossing - 0.3) / 0.4));
  return { rotateY: (progress - 0.5) * 90, rotateX: (0.5 - progress) * 8 };
}
