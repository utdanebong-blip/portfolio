import{c as i}from"./index-4zVkLjMP.js";import{r as t}from"./vendor-react-DEhD4NTb.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=i("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);function d(s){const e=t.useRef(null),[a,o]=t.useState(!1);return t.useEffect(()=>{const r=e.current;if(!r)return;const n=new IntersectionObserver(c=>{c.forEach(u=>{u.isIntersecting&&o(!0)})},{threshold:.15,...s});return n.observe(r),()=>n.disconnect()},[e.current]),{ref:e,inView:a}}export{p as G,d as u};
