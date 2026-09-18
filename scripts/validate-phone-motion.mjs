import assert from 'node:assert/strict';
import { phoneScrollPose } from '../lib/phone-motion.ts';

assert.deepEqual(phoneScrollPose(900, 560, 900), { rotateY: -45, rotateX: 4 });
assert.deepEqual(phoneScrollPose(170, 560, 900), { rotateY: 0, rotateX: 0 });
assert.deepEqual(phoneScrollPose(-560, 560, 900), { rotateY: 45, rotateX: -4 });
// Full rotation is visible before the device exits the viewport.
assert.equal(phoneScrollPose(462, 560, 900).rotateY, -45);
assert.ok(Math.abs(phoneScrollPose(-122, 560, 900).rotateY - 45) < 1e-10);
assert.deepEqual(
  phoneScrollPose(2000, 560, 900),
  phoneScrollPose(900, 560, 900),
);
assert.deepEqual(
  phoneScrollPose(-2000, 560, 900),
  phoneScrollPose(-560, 560, 900),
);
for (const viewport of [360, 700, 900, 1400]) {
  let previous = -46;
  for (let top = viewport; top >= -560; top -= 10) {
    const pose = phoneScrollPose(top, 560, viewport);
    assert.ok(pose.rotateY >= previous, 'downward scroll turns progressively');
    assert.ok(Math.abs(pose.rotateY) <= 45 && Math.abs(pose.rotateX) <= 4);
    assert.deepEqual(
      pose,
      phoneScrollPose(top, 560, viewport),
      'same pose on reverse scroll',
    );
    previous = pose.rotateY;
  }
}
assert.ok(Number.isFinite(phoneScrollPose(0, 0, 0).rotateY));
console.log(
  'PASS: +/-45 degree visible rotation, 90 degree total arc, centered pose, reverse scroll, desktop/mobile viewport geometry.',
);
