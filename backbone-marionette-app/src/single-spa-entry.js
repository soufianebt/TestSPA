import singleSpaBackbone from "@emtecinc/single-spa-backbone";
import "./main.js";

const lifecycles = singleSpaBackbone({
  BasePath: "backbone-app3",
  App: { AppPath: "src/app" },
  DomElementSetter: domElementSetter
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

function domElementSetter() {
  let el = document.getElementById("backbone-app-container");
  if (!el) {
    el = document.createElement("div");
    el.id = "backbone-app-container";
    document.body.appendChild(el);
    console.log("✅ `backbone-app-container` created dynamically.");
  } else {
    console.log("✅ `backbone-app-container` already exists.");
  }
}
