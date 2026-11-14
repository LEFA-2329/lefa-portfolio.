// Keep supported mobile browser bars aligned with the shared desktop/mobile palette.
// Theme selection and persistence remain owned by theme-settings.mjs.
const root = document.documentElement;
const browserColour = document.querySelector('meta[name="theme-color"]');
function updateBrowserColour() {
  if (browserColour)
    browserColour.content = getComputedStyle(root).getPropertyValue('--surface').trim();
}
updateBrowserColour();
new MutationObserver(updateBrowserColour).observe(root, {
  attributes: true,
  attributeFilter: ['data-theme'],
});
