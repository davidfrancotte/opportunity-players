import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import postcss from 'postcss';

const css = fs.readFileSync(new URL('../app/espace/studio-light.css', import.meta.url), 'utf8');
test('light overrides have nonempty selectors scoped to the web member surface', () => {
  postcss.parse(css).walkRules(rule => {
    assert.ok(rule.selector.trim());
    for (const selector of rule.selectors)
      assert.ok(selector.startsWith('body:has(.studio-surface[data-theme="light"])'), selector);
  });
});
test('light theme does not recolor photos with CSS filters', () => {
  postcss.parse(css).walkDecls(decl => assert.notEqual(decl.prop, 'filter'));
});
test('light text palette meets 4.5:1 contrast on white, canvas and tinted cards', () => {
  const luminance = hex => {
    const channels = hex.match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const text of ['17211d', '52614e', '486319', 'a72f2f'])
    for (const background of ['ffffff', 'f5f7f4', 'eff5e7', 'edf1eb'])
      assert.ok((luminance(background) + .05) / (luminance(text) + .05) >= 4.5, `${text}/${background}`);
});
