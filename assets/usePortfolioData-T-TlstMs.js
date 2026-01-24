import{j as a}from"./vendor-r3f-C5e-dI0K.js";import{u as v,r as m,L as p}from"./vendor-react-DEhD4NTb.js";import{a as u,X as w}from"./index-CB4VDsos.js";import{b as k,H as x,I as D,U as j,B as A,a as S,A as P,F as M}from"./ArtisticNav-DIrs9CWT.js";const h=[{path:"/",label:"Home",icon:x},{path:"/gallery",label:"Gallery",icon:D},{path:"/about",label:"About",icon:j},{path:"/blog",label:"Blog",icon:A},{path:"/contact",label:"Contact",icon:S}];function C(){const t=v(),[n,i]=m.useState(!1);return a.jsxs("header",{className:"fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border",children:[a.jsx("div",{className:"container mx-auto px-4",children:a.jsxs("div",{className:"flex items-center justify-between h-16",children:[a.jsxs(p,{to:"/",className:"flex items-center gap-2 group",children:[a.jsx("div",{className:"w-10 h-10 rounded border border-primary flex items-center justify-center glow-green",children:a.jsx("span",{className:"font-display font-bold text-primary text-lg",children:"UE"})}),a.jsx("span",{className:"font-display text-lg hidden sm:block text-foreground group-hover:text-primary transition-colors",children:"UTIBE EBONG"})]}),a.jsx("nav",{className:"hidden md:flex items-center gap-1",children:h.map(e=>{const s=e.icon,l=t.pathname===e.path;return a.jsxs(p,{to:e.path,className:u("flex items-center gap-2 px-4 py-2 rounded font-body text-sm transition-all duration-300",l?"bg-primary/20 text-primary border border-primary/50":"text-muted-foreground hover:text-foreground hover:bg-secondary"),children:[a.jsx(s,{size:16}),e.label]},e.path)})}),a.jsx("button",{className:"md:hidden p-2 text-foreground hover:text-primary transition-colors",onClick:()=>i(!n),"aria-label":"Toggle menu",children:n?a.jsx(w,{size:24}):a.jsx(k,{size:24})})]})}),n&&a.jsx("nav",{className:"md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-slide-in-up",children:a.jsx("div",{className:"container mx-auto px-4 py-4 flex flex-col gap-2",children:h.map(e=>{const s=e.icon,l=t.pathname===e.path;return a.jsxs(p,{to:e.path,onClick:()=>i(!1),className:u("flex items-center gap-3 px-4 py-3 rounded font-body transition-all",l?"bg-primary/20 text-primary border border-primary/50":"text-muted-foreground hover:text-foreground hover:bg-secondary"),children:[a.jsx(s,{size:20}),e.label]},e.path)})})})]})}function pe({children:t}){return a.jsxs("div",{className:"min-h-screen flex flex-col bg-background",children:[a.jsx("div",{className:"hidden lg:block",children:a.jsx(P,{})}),a.jsx("div",{className:"lg:hidden",children:a.jsx(C,{})}),a.jsx("main",{className:"flex-1 pt-20",children:t}),a.jsx(M,{})]})}const z={bio:`Professional 3D Artist with over 6 years of experience creating high quality game ready props, architectural visualizations, and product renders. Skilled in building production ready assets, leading small teams, and delivering visuals that balance technical accuracy with strong visual storytelling.

My work focuses on creating production ready assets that balance realism, performance, and strong visual storytelling. I have experience modeling and texturing game ready props, producing architectural renders, and building high quality product visuals for marketing and e commerce platforms.

Beyond asset creation, I have led small creative teams, collaborated with developers and designers, and continuously refined workflows to improve quality and efficiency.

I enjoy building tools and pipelines that enhance realism, reduce repetitive work, and elevate final output quality.`,profileImage:"profile_img.jpeg",experiences:[{id:"1",title:"Prop Artist and Visual Designer",company:"The Jaybotton Artistry",location:"Remote",startDate:"January 2025",endDate:"Present",description:"Lead Prop and 3D visualization",achievements:["Create high converting Archviz renders","Manage and coordinate a Large creative team","Improve visual consistency and Prop Modeling across projects"]},{id:"2",title:"Lead Team Manager, Product Designer & Amazon Listing Visualizer",company:"Band Masters",location:"Remote",startDate:"June 2022",endDate:"January 2023",description:"Lead product design and 3D visualization for Amazon listings",achievements:["Create high converting product renders and presentation scenes","Manage and coordinate a small creative team","Improve visual consistency and brand presentation across products"]},{id:"3",title:"Lead 3D Character Modeling Artist",company:"Blueberry Studios",location:"Shenzen, China",startDate:"January 2023",endDate:"July 2025",description:"General 3D artist for indie game projects",achievements:["Managed game art teams and production schedules","Created realistic and stylized props for game environments","Ensured assets met performance and visual quality standards"]},{id:"4",title:"3D Modeler & Product Designer",company:"Berlin Brand Group",location:"Shenzen, China",startDate:"March 2020",endDate:"July 2022",description:"Product Designer and 3D visualizer for consumer products",achievements:["Modeled consumer products and created marketing visualization scenes","Delivered clean topology and render ready assets","Supported branding and advertising campaigns with 3D visuals"]},{id:"5",title:"3D Modeling & Advertising Specialist",company:"Signalytics Advertising Agency",location:"Texas, U.S.A, Remote",startDate:"November 2021",endDate:"July 2025",description:"Product Designer and 3D visualizer for consumer products",achievements:["Created 3D advertising visuals for digital campaigns","Designed product focused scenes for marketing and e commerce"]}],skills:[{id:"1",name:"Autodesk 3Ds Max",level:95,category:"software"},{id:"2",name:"3D Modeling for Games and ArchViz",level:95,category:"software"},{id:"3",name:"Substance Painter",level:90,category:"software"},{id:"4",name:"Autodesk Maya",level:75,category:"software"},{id:"5",name:"Marmoset Toolbag",level:80,category:"software"},{id:"6",name:"UV Mapping",level:90,category:"skill"},{id:"7",name:"PBR Texturing",level:92,category:"skill"},{id:"8",name:"Hard Surface Modeling",level:88,category:"skill"},{id:"9",name:"Team Leadership",level:82,category:"skill"}]},T={education:[{id:"1",degree:"Bachelor in Civil Engineering",institution:"Liaoning Shihua University",location:"Fushun, China",startDate:"2018",endDate:"2022",description:"Specialized Building Calculations, Design and art with honors"},{id:"1",degree:"Bachelor in Architecture",institution:"University of Uyo",location:"Uyo, Nigeria",startDate:"2010",endDate:"2014",description:"Specialized Building Designs, Devlope plans and querry functionality"}],experiences:[{id:"1",title:"Prop Artist and Visual Designer",company:"The Jaybotton Artistry",location:"Remote",startDate:"January 2025",endDate:"Present",description:"Lead Prop and 3D visualization",achievements:["Create high converting Archviz renders","Manage and coordinate a Large creative team","Improve visual consistency and Prop Modeling across projects"]},{id:"2",title:"Lead Team Manager, Product Designer & Amazon Listing Visualizer",company:"Band Masters",location:"Remote",startDate:"June 2022",endDate:"January 2023",description:"Lead product design and 3D visualization for Amazon listings",achievements:["Create high converting product renders and presentation scenes","Manage and coordinate a small creative team","Improve visual consistency and brand presentation across products"]},{id:"3",title:"Lead 3D Character Modeling Artist",company:"Blueberry Studios",location:"Shenzen, China",startDate:"January 2023",endDate:"July 2025",description:"General 3D artist for indie game projects",achievements:["Managed game art teams and production schedules","Created realistic and stylized props for game environments","Ensured assets met performance and visual quality standards"]},{id:"4",title:"3D Modeler & Product Designer",company:"Berlin Brand Group",location:"Shenzen, China",startDate:"March 2020",endDate:"July 2022",description:"Product Designer and 3D visualizer for consumer products",achievements:["Modeled consumer products and created marketing visualization scenes","Delivered clean topology and render ready assets","Supported branding and advertising campaigns with 3D visuals"]},{id:"5",title:"3D Modeling & Advertising Specialist",company:"Signalytics Advertising Agency",location:"Texas, U.S.A, Remote",startDate:"November 2021",endDate:"July 2025",description:"Product Designer and 3D visualizer for consumer products",achievements:["Created 3D advertising visuals for digital campaigns","Designed product focused scenes for marketing and e commerce"]}],skills:[{id:"1",name:"3Ds Max",level:98,category:"software"},{id:"2",name:"3D Modeling for Games and ArchViz",level:98,category:"software"},{id:"3",name:"Substance Painter",level:90,category:"software"},{id:"4",name:"Maya",level:75,category:"software"},{id:"5",name:"Marmoset Toolbag",level:80,category:"software"},{id:"6",name:"UV Mapping",level:95,category:"skill"},{id:"7",name:"PBR Texturing",level:92,category:"skill"},{id:"8",name:"Hard Surface Modeling",level:88,category:"skill"},{id:"9",name:"Team Leadership",level:82,category:"skill"}],certifications:["Civil Engineering Degree","Architecture Degree","Unreal Engine Certified Developer","Substance Painter Masterclass Certificate","CGMA Hard Surface Modeling"],recommendations:["Recommendations available upon request."]},B={email:"ebongutibe@gmail.com",phone:"+234 707 148 6994",location:"Lagos, Nigeria",social:{artstation:"https://www.artstation.com/captionstudioz2",linkedin:"https://www.linkedin.com/in/utibe-ebong-3d-artist?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",twitter:"https://x.com/captioninnovate?s=21",instagram:"https://www.instagram.com/official_utibe_ebong?igsh=MXU0Zzh4bnNocGNqeA%3D%3D&utm_source=qr"}},V=[{id:"1",title:"The Viking War Helmet",description:"The Viking War Helmet, an iconic symbol of the fierce Norse warriors, has been faithfully modeled in exquisite detail using the advanced 3D modeling software, 3ds Max. Crafted with meticulous attention to historical accuracy, every curve and intricate embellishment has been carefully recreated to ensure authenticity. The helmet has been textured using the industry-standard Substance Painter, giving it a realistic and ancient look, making it appear as if it had endured countless battles and harsh weather conditions. Its breathtakingly beautiful design is finished off with a highly polished metal sheen, allowing its gleaming surface to intimidate foes on the battlefield. This helmet also features functional properties, including adjustable straps for maximum comfort, a sturdy leather chin strap and a detachable face guard for extra protection. Whether used for re-enactment purposes or simply as a collectible piece of history, the Viking War Helmet is sure to be an impressive addition to any display.",thumbnail:"https://cdnb.artstation.com/p/assets/images/images/065/870/485/small/caption-full-render5.jpg?1691444721",images:{rendered:"https://cdna.artstation.com/p/assets/images/images/065/870/484/small/caption-full-render4.jpg?1691444715",wireframe:"https://cdnb.artstation.com/p/assets/images/images/065/870/491/small/caption-wireframe.jpg?1691444736",uv:"https://cdna.artstation.com/p/assets/images/images/065/870/496/small/caption-uv-02.jpg?1691444748"},glb:"/assets/models/project-1-viking-helmet.glb",startDate:"2024-01-01",completedAt:"2024-01-15",specs:{polyCount:2500,vertexCount:800,texelDensity:"512 px/m",materialSlots:3,textureResolution:"4K",fileSize:"45 MB",status:"Completed",location:"Lagos, Nigeria",area:"N/A",type:"Props",style:"Realistic",year:"2024"},software:["3Ds Max","Substance Painter","Marmoset Toolbag"],category:"Props",createdAt:"2024-01-15",process:"Started with concept sketches, blocked out basic shapes in Blender, refined topology for game-ready mesh, created high-poly for baking, textured in Substance Painter with custom smart materials."},{id:"2",title:"Old Decaying Skull",description:"Custom 3D model of a decayed skull from 12 reference images. Sculpted high frequency details in ZBrush, retopologized in Blender for optimal game performance, hand painted wear and tear details in Substance Painter.",thumbnail:"https://cdna.artstation.com/p/assets/video_clips/images/048/963/706/small/caption-thumb.jpg?1651367430=crop",images:{rendered:"https://cdnb.artstation.com/p/assets/images/images/048/770/383/small/caption-side.jpg?1650905520=crop",wireframe:"https://cdna.artstation.com/p/assets/images/images/048/776/512/small/caption-1.jpg?1650914871=crop",uv:"https://cdnb.artstation.com/p/assets/images/images/048/770/329/small/caption-front-full.jpg?1650905441=crop"},glb:"/assets/models/project-2-old-decaying-skull.glb",startDate:"2024-02-01",completedAt:"2024-02-20",specs:{polyCount:3200,vertexCount:3100,texelDensity:"1024 px/m",materialSlots:2,textureResolution:"4K",fileSize:"28 MB",status:"Completed",location:"Remote",area:"N/A",type:"Props",style:"Realistic",year:"2024"},software:["ZBrush","3Ds Max","Substance Painter","Vray"],category:"Props",createdAt:"2024-02-20",process:"Sculpted wood grain details in ZBrush, retopologized in Blender for optimal game performance, hand-painted wear and tear details in Substance Painter."},{id:"3",title:"Water Drum",description:"The Water Drum is a meticulously crafted and highly detailed game-ready prop, created using industry-leading software such as 3ds Max and Substance 3D Painter. Its purpose is to enrich the visual appeal of game environments, whether they are being developed in Unity, Unreal Engine, or any other engine. Its realistic design, with texturing and lighting that has been optimized for game engines, makes it perfect for virtual worlds of any genre. Its versatility makes the Water Drum an easy fit into any project.",thumbnail:"https://cdnb.artstation.com/p/marketplace/presentation_assets/002/919/435/large/file.jpg?1691515244",images:{rendered:"https://cdna.artstation.com/p/marketplace/presentation_assets/002/919/430/large/file.jpg?1691515139",wireframe:"https://cdna.artstation.com/p/marketplace/presentation_assets/002/919/434/large/file.jpg?1691515224",uv:"https://cdnb.artstation.com/p/marketplace/presentation_assets/002/919/429/large/file.jpg?1691515122"},glb:"/assets/models/project-3-cyberpunk-vending-machine.glb",startDate:"2024-02-25",completedAt:"2024-03-10",specs:{polyCount:1e3,vertexCount:500,texelDensity:"768 px/m",materialSlots:2,textureResolution:"4K",fileSize:"15 MB",status:"Completed",location:"Beijing, China",area:"N/A",type:"Props",style:"Stylized",year:"2024"},software:["3Ds Max","Substance Painter","Vray"],category:"Props",createdAt:"2024-03-10",process:"Hard-surface modeled in 3ds max no boolean operations, created custom decals and holographic materials, added emissive maps effects."},{id:"4",title:"Gas Cylinder and Cooking Pot",description:"Gas Cylinder: This game prop model is a highly detailed 3D representation of a worn-out and old gas cylinder. Textured with meticulous attention to detail, the weathered and distressed appearance gives it a sense of history. The model features realistic markings and embellishments that bring it to life. Cooking Pot: This game prop model is a 3D representation of a worn-out and old cooking pot. Textured with meticulous attention to detail, the weathered and distressed appearance gives it a sense of history. The pot's handle and lid are functional and can be moved and posed for added realism. The model features realistic markings and embellishments that bring it to life.",thumbnail:"https://cdna.artstation.com/p/assets/images/images/065/847/998/small/caption-gascylinder-arnoldpsd.jpg?1691400463=crop",images:{rendered:"https://cdna.artstation.com/p/assets/images/images/065/847/974/small/caption-gascylinder-arnold-view2.jpg?1691400429=crop",wireframe:"https://cdna.artstation.com/p/assets/images/images/065/847/990/small/caption-gascylinder-arnold-view2-nomat.jpg?1691400452=crop",uv:"https://cdna.artstation.com/p/assets/images/images/065/848/004/small/caption-pot.jpg?1691400472=crop"},glb:"/assets/models/project-3-cyberpunk-vending-machine.glb",startDate:"2024-03-01",completedAt:"2024-03-10",specs:{polyCount:1900,vertexCount:200,texelDensity:"768 px/m",materialSlots:4,textureResolution:"4K",fileSize:"62 MB",status:"In Development",location:"Shenzen, China",area:"N/A",type:"Props",style:"Realistic",year:"2024"},software:["3Ds Max","Substance Painter","Vray"],category:"Props",createdAt:"2024-03-10",process:"Hard-surface modeled in Blender using boolean operations, created custom decals and holographic materials, added emissive maps for neon lighting effects."}],U=[{id:"a1",title:"Coastal Family Residence",description:"A modern coastal residence balancing warm materials and expansive glazing to capture ocean views. The project focuses on daylight performance and material tactility.",thumbnail:"https://cdnb.artstation.com/p/assets/images/images/065/751/823/large/caption-bamboo-houserendered-mat.jpg?1691123035",video:"https://vimeo.com/1154644432?fl=ip&fe=ec",category:"Archviz",images:{exterior:"https://cdna.artstation.com/p/assets/images/images/065/751/814/large/caption-bamboo-house-uv.jpg?1691123015",interior:"https://images.unsplash.com/photo-1523911272850-6b0e9fca8b5d?w=1600&q=80",floorPlan:"https://images.unsplash.com/photo-1542317854-6e9f0a5a5f29?w=1600&q=80",detail:"https://cdna.artstation.com/p/assets/images/images/065/751/820/large/caption-bamboo-houserendered.jpg?1691123023"},specs:{status:"Completed",location:"Fushun, China",area:"320 m²",type:"Residential",style:"Contemporary",year:"2022"},software:["3Ds Max","Vray Renderer","Photoshop"],concept:"Merge indoor and outdoor living through large operable glazing and layered terraces.",createdAt:"2024-08-01",startDate:"2023-09-01",completedAt:"2024-08-01"},{id:"a2",title:"Minimal Urban Loft",description:"An industrial loft conversion prioritizing material honesty and neutral palettes. Focused on spatial sequencing and natural light.",thumbnail:"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80",category:"Archviz",images:{exterior:"https://images.unsplash.com/photo-1505691723518-36a0b43f3b7c?w=1600&q=80",interior:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80",floorPlan:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80",detail:"https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1600&q=80"},specs:{status:"In Development",location:"Berlin, Germany",area:"180 m²",type:"Residential",style:"Minimal",year:"2025"},software:["Blender","Cycles","Substance Painter"],concept:"Resurrect raw industrial elements with refined minimal interventions.",createdAt:"2025-01-10",startDate:"2024-06-01",completedAt:"2025-01-10"}],I=[{id:"p1",title:"Sleek Sunglasses Case",description:"Keep your shades safe and stylish with this durable sunglasses case, designed for life on the move. Featuring a bold yellow zipline for a pop of color and quick access, this case also includes a secure hook that easily clips onto your belt loop, bag, or pants for hands-free convenience. The semi-hard shell offers solid protection against bumps and scratches, while the compact, lightweight design makes it perfect for travel, outdoor adventures, or daily commutes.",thumbnail:"https://cdna.artstation.com/p/assets/images/images/090/216/016/large/caption-test-blue-44.jpg?1753260272=80",video:"https://vimeo.com/1154646779?fl=ip&fe=ec",category:"ProductViz",images:{front:"https://cdna.artstation.com/p/assets/images/images/090/216/016/large/caption-test-blue-44.jpg?1753260272=80",top:"https://cdna.artstation.com/p/assets/images/images/090/216/024/large/caption-test-blue-51.jpg?1753260297=80",side:"https://cdna.artstation.com/p/assets/images/images/090/216/020/large/caption-test-blue-49.jpg?1753260287=80","3dperspective":"https://cdna.artstation.com/p/assets/images/images/090/216/022/large/caption-test-blue-50.jpg?1753260291=80",hero:"https://cdna.artstation.com/p/assets/images/images/090/216/016/large/caption-test-blue-44.jpg?1753260272=80",lifestyle:"https://cdna.artstation.com/p/assets/images/images/090/216/022/large/caption-test-blue-50.jpg?1753260291=80",detail:"https://cdna.artstation.com/p/assets/images/images/090/216/020/large/caption-test-blue-49.jpg?1753260287=80",packaging:"https://cdna.artstation.com/p/assets/images/images/090/216/024/large/caption-test-blue-51.jpg?1753260297=80"},specs:{status:"Completed",location:"China",client:"BP",deliverables:"Renders, Lifestyle Mockups",year:"2025",industry:"Consumer Product"},software:["3Ds Max","Substance Painter","Marmoset Toolbag"],highlights:["Studio lighting setup","Physically-based materials","Composited lifestyle shots"],createdAt:"2025-01-01",startDate:"2024-11-15",completedAt:"2025-01-01"},{id:"p2",title:"SHD Smoke Detectors - Modern Home Safety Solution",description:"Stay safe with SHD Smoke Detectors, engineered for fast, reliable fire detection in homes, offices, and commercial spaces. Using advanced photoelectric sensing technology, SHD detectors quickly identify smoke from slow-burning and smoldering fires, giving you critical extra time to respond. Designed for easy installation and low maintenance, each unit features a loud, 85dB alarm and optional interconnectivity for enhanced coverage across multiple rooms.",thumbnail:"https://cdnb.artstation.com/p/assets/images/images/090/217/421/large/caption-composition2.jpg?1753263638=80",category:"ProductViz",images:{front:"https://cdnb.artstation.com/p/assets/images/images/090/217/171/large/caption-idea-front.jpg?1753262928=80",top:"https://cdnb.artstation.com/p/assets/images/images/090/217/203/large/caption-ebc-close-up.jpg?1753263046=80",side:"https://cdna.artstation.com/p/assets/images/images/090/217/688/large/caption-product-with-magnet.jpg?1753264300=80","3dperspective":"https://cdnb.artstation.com/p/assets/images/images/090/217/401/large/caption-composition2.jpg?1753263608=80",hero:"https://cdnb.artstation.com/p/assets/images/images/090/217/171/large/caption-idea-front.jpg?1753262928=80",lifestyle:"https://cdnb.artstation.com/p/assets/images/images/090/217/401/large/caption-composition2.jpg?1753263608=80",detail:"https://cdna.artstation.com/p/assets/images/images/090/217/688/large/caption-product-with-magnet.jpg?1753264300=80",packaging:"https://cdnb.artstation.com/p/assets/images/images/090/217/203/large/caption-ebc-close-up.jpg?1753263046=80"},specs:{status:"Completed",location:"Onsite, Germany",client:"BBG",deliverables:"Hero Renders, Lifestyle Mockups",year:"2025",industry:"Consumer Electronics"},software:["3Ds Max","Substance Painter","Photobashing"],highlights:["Studio composite","Shadow catchers","Color variants"],createdAt:"2023-04-12",startDate:"2023-02-15",completedAt:"2023-04-12"},{id:"p3",title:"Nordic Trekking Sticks - Aluminum Alloy Set",description:"Conquer any terrain with confidence using this Nordic hiking stick, crafted for stability, endurance, and comfort. Lightweight yet durable, it features an ergonomic handle for a natural grip, adjustable height for personalized support, and a shock-absorbing tip for smooth movement across rugged paths. Whether you're powering through mountain trails or enjoying a casual nature walk, this stick enhances balance, reduces joint strain, and keeps your rhythm steady.",thumbnail:"https://cdnb.artstation.com/p/assets/images/images/090/216/931/large/caption-new-scene.jpg?1753262339=80",category:"ProductViz",images:{front:"https://cdnb.artstation.com/p/assets/images/images/090/216/883/large/caption-main-closeups.jpg?1753262280=80",top:"https://cdnb.artstation.com/p/assets/images/images/090/216/935/large/caption-1.jpg?1753262344=80",side:"https://cdna.artstation.com/p/assets/images/images/090/216/923/large/caption-meir.jpg?1753262328=80","3dperspective":"https://cdnb.artstation.com/p/assets/images/images/090/216/953/large/caption-compo-2-blackstick.jpg?1753262371=80",hero:"https://cdnb.artstation.com/p/assets/images/images/090/216/883/large/caption-main-closeups.jpg?1753262280=80",lifestyle:"https://cdnb.artstation.com/p/assets/images/images/090/216/953/large/caption-compo-2-blackstick.jpg?1753262371=80",detail:"https://cdna.artstation.com/p/assets/images/images/090/216/923/large/caption-meir.jpg?1753262328=80",packaging:"https://cdnb.artstation.com/p/assets/images/images/090/216/935/large/caption-1.jpg?1753262344=80"},specs:{status:"Completed",location:"Onsite, Germany",client:"BBG",deliverables:"Hero Renders, Lifestyle Mockups",year:"2025",industry:"Consumer Electronics"},software:["3Ds Max","Substance Painter","Photobashing"],highlights:["Studio composite","Shadow catchers","Color variants"],createdAt:"2023-02-12",startDate:"2022-12-20",completedAt:"2023-02-12"},{id:"p4",title:"Carrier Sunglasses case Product Render - Yellow Zipline Edition",description:"Keep your shades safe and stylish with this durable sunglasses case, designed for life on the move. Featuring a bold yellow zipline for a pop of color and quick access, this case also includes a secure hook that easily clips onto your belt loop, bag, or pants for hands-free convenience. The semi-hard shell offers solid protection against bumps and scratches, while the compact, lightweight design makes it perfect for travel, outdoor adventures, or daily commutes.",thumbnail:"https://cdna.artstation.com/p/assets/images/images/090/215/672/large/caption-carrier-top-side-197.jpg?1753259484=80",category:"ProductViz",images:{front:"https://cdna.artstation.com/p/assets/images/images/090/215/672/large/caption-carrier-top-side-197.jpg?1753259484=80",top:"https://cdnb.artstation.com/p/assets/images/images/090/215/663/large/caption-carrier-top-196.jpg?1753259470=80",side:"https://cdna.artstation.com/p/assets/images/images/090/215/704/large/caption-carrier-top-side-2-198.jpg?1753259552=80","3dperspective":"https://cdna.artstation.com/p/assets/images/images/090/215/666/large/caption-carrier-top-1-202.jpg?1753259477=80",hero:"https://cdna.artstation.com/p/assets/images/images/090/215/672/large/caption-carrier-top-side-197.jpg?1753259484=80",lifestyle:"https://cdna.artstation.com/p/assets/images/images/090/215/666/large/caption-carrier-top-1-202.jpg?1753259477=80",detail:"https://cdna.artstation.com/p/assets/images/images/090/215/704/large/caption-carrier-top-side-2-198.jpg?1753259552=80",packaging:"https://cdnb.artstation.com/p/assets/images/images/090/215/663/large/caption-carrier-top-196.jpg?1753259470=80"},specs:{status:"Completed",location:"Onsite, China",client:"BP",deliverables:"Hero Renders, Lifestyle Mockups",year:"2025",industry:"Consumer Electronics"},software:["3Ds Max","Substance Painter","Photobashing"],highlights:["Studio composite","Shadow catchers","Color variants"],createdAt:"2025-02-12",startDate:"2025-01-15",completedAt:"2025-02-12"},{id:"p5",title:"Daily Jornal- Little More",description:"Capture your thoughts, goals, and reflections with the Little More Daily Journal — a minimalist companion designed to help you stay mindful, focused, and intentional. With a clean layout and guided sections for daily gratitude, priorities, and personal reflections, this journal encourages you to do a little more each day: more clarity, more growth, more you.",thumbnail:"https://cdna.artstation.com/p/assets/images/images/090/217/788/large/caption-book-rendered-13.jpg?1753264532=80",category:"ProductViz",images:{front:"https://cdnb.artstation.com/p/assets/images/images/090/217/889/large/caption-book-rendered-2.jpg?1753264753=80",top:"https://cdna.artstation.com/p/assets/images/images/090/217/806/large/caption-book-rendered-15.jpg?1753264595=80",side:"https://cdnb.artstation.com/p/assets/images/images/090/217/847/large/caption-book-rendered-1.jpg?1753264691=80","3dperspective":"https://cdna.artstation.com/p/assets/images/images/090/217/788/large/caption-book-rendered-13.jpg?1753264532=80"},specs:{status:"Completed",location:"Onsite, China",client:"BBG",deliverables:"Hero Renders, Lifestyle Mockups",year:"2025",industry:"Books & Stationery"},software:["3Ds Max","Substance Painter","Photobashing"],highlights:["Studio composite","Shadow catchers","Color variants"],createdAt:"2022-02-12",startDate:"2021-12-01",completedAt:"2022-02-12"}],L=[{id:"1",name:"Marius Silaghi’s plugins for 3DS Max",description:"Download Marius Silaghi’s plugins for 3DS Max 9 to 2025, including useful tools for modeling, texturing, and rendering.",icon:"📦",downloadUrl:"https://fileaxa.com/q3fc141haiv5",category:"3Ds Max 2020 - 2025"},{id:"2",name:"ProjectManager_3",description:"Managing assets is often the most time-consuming part of any 3ds Max project—accessing, organizing, and creating scenes along with Models, Materials, Textures, IES lights, Proxies, and more can quickly eat up hours.",icon:"📦",downloadUrl:"https://drive.google.com/file/d/1zi1pQ438ejkMmvg6sjEGwX1fQfW5AZwv/view?usp=sharing",category:"3Ds Max Plugin 2014-2025"},{id:"3",name:"Chaos Phoenix 5.23",description:"Chaos® Phoenix is capable of a wide range of effects including fire, smoke, liquids, flames, explosions, rigid body simulations, ocean waves, mist and splashes to list just a few. Quick presets and fast setup make it easy to get started, and its powerful simulation engine offers complete control over more complex effects.",icon:"📦",downloadUrl:"https://fileaxa.com/54qb0tk0i2rl",category:"Maya 2022-2025"}],q=[{id:"1",title:"Optimizing Game Props: A Deep Dive into LOD Techniques",excerpt:"Learn how to create efficient LOD chains that maintain visual quality while dramatically improving performance.",content:`Level of Detail (LOD) is crucial for game performance. In this post, I'll share my workflow for creating LOD chains that maintain visual fidelity while optimizing for real-time rendering.

## Why LODs Matter

When rendering a scene with hundreds of props, each polygon counts. LODs allow the engine to swap high-detail models for simpler versions as objects move further from the camera.

## My LOD Workflow

1. Start with the highest detail - Create your hero model with all the details you need for close-up shots.
2. Use decimation wisely - Tools like Blender's Decimate modifier can help, but manual retopology often yields better results.
3. Preserve silhouettes - The outline of your object is what the eye notices first at distance.
4. Bake details to textures - Normal maps can maintain the illusion of detail on lower poly models.

## Results

Following this workflow, I've been able to reduce poly counts by 80% on LOD2 while maintaining 90% of the visual quality at typical viewing distances.`,coverImage:"/assets/Optimizing-Game-Props-A-Deep-Dive-into-LOD-Techniques.png",category:"Tutorial",tags:["optimization","LOD","game-art"],publishedAt:"2024-03-15"},{id:"2",title:"My Substance Painter Smart Material Library",excerpt:"Building a reusable material library has transformed my texturing workflow. Here is how I organize mine.",content:`After years of texturing props, I have built up a library of smart materials that I reuse across projects. Let me share how I organize and create these materials.

## The Power of Smart Materials

Smart materials react to mesh data like curvature, ambient occlusion, and world space position. This means they adapt automatically to new meshes.

## Categories I Use

- Metals - Steel, iron, copper, gold variations
- Woods - Aged, painted, varnished, weathered
- Fabrics - Leather, cloth, canvas
- Wear & Damage - Edge wear, scratches, dirt

## Tips for Creating Reusable Materials

1. Use anchor points for flexibility
2. Expose key parameters for easy customization
3. Name layers clearly for future reference
4. Test on multiple meshes before finalizing`,coverImage:"/assets/smartlib.png",category:"Workflow",tags:["substance-painter","texturing","materials"],publishedAt:"2026-02-28"},{id:"3",title:"Breaking Down AAA Game Props",excerpt:"What makes AAA game props stand out? I analyzed props from recent releases to find common patterns.",content:`I spent a week analyzing props from recent AAA releases to understand what makes them work. Here are my findings.

## Common Patterns

### Material Complexity
Most hero props use 2-4 material slots with carefully planned texture atlases.

### Detail Distribution
High-frequency details are concentrated in areas players interact with or look at closely.

### Color Theory
Successful props use limited color palettes with strategic accent colors.

## What I Learned

The best props tell micro-stories through wear patterns and design choices. A weapon isn't just a weapon - it's a history of battles.`,coverImage:"/assets/breaking.png",category:"Analysis",tags:["AAA","game-art","study"],publishedAt:"2026-01-20"},{id:"4",title:"Steps to Follow to Start an ArchViz Render in 3ds Max",excerpt:"A practical step-by-step guide to setting up your first architectural visualization render in 3ds Max.",content:`Architectural visualization (ArchViz) is all about realism—materials, lighting, composition, and mood. Before you even hit the Render button in 3ds Max, there are essential steps you must follow to set your project up correctly.

This guide walks you through the core steps to start an ArchViz render in 3ds Max, whether you’re a beginner or refining your workflow.

## 1. Plan Your Scene Before Opening 3ds Max

Good ArchViz starts outside the software.

Before modeling or rendering:
- Study architectural references (real photos, ArchDaily, Behance)
- Decide the style (modern, classic, minimal, luxury)
- Choose the time of day (morning, sunset, night)
- Decide whether it’s an interior or exterior render

Clear planning gives your render direction and saves time later.

## 2. Set Up Your Project Properly

Once inside 3ds Max, correct setup is critical.

### Units Setup
Go to Customize → Units Setup and set system units to centimeters or meters. Correct scale ensures realistic lighting, materials, and camera behavior.

## 3. Model with Clean Geometry

Clean geometry improves realism and render performance.

Best practices include:
- Use real architectural dimensions
- Avoid unnecessary polygons
- Separate walls, floors, and ceilings
- Add chamfers or bevels to sharp edges

## 4. Import or Create Architectural Details

Details sell realism.

Add elements like doors, windows, furniture, lighting fixtures, and props. You can model simple assets yourself or import high-quality assets, ensuring proper scale and placement.

## 5. Assign Correct Materials

Materials play a huge role in ArchViz quality.

Use PBR-based materials and avoid pure black or white colors. Always include diffuse, roughness or glossiness, and normal or bump maps. If using V-Ray or Corona, stick to their native material systems.

## 6. Set Up the Camera

Never render from the perspective view.

Use a proper camera and:
- Set realistic camera height
- Choose appropriate focal length
- Enable vertical tilt correction
- Compose using the safe frame

## 7. Create Realistic Lighting

Lighting is the heart of ArchViz.

For interiors, combine Sun & Sky systems, HDRIs, and artificial lights. For exteriors, focus on sun position, sky balance, and natural shadows. Start simple and refine gradually.

## 8. Configure Render Settings

Before final rendering:
- Select the correct render engine
- Enable global illumination
- Use low resolution for test renders
- Activate denoising for previews

Avoid high-quality settings until the scene is fully refined.

## 9. Do Test Renders and Adjust

Test renders help identify lighting issues, material problems, and exposure errors. This is where most improvements happen.

## 10. Prepare for Final Render

Once satisfied:
- Increase resolution
- Raise render quality
- Optimize the scene
- Save a final version before rendering

## Conclusion

Starting an ArchViz render in 3ds Max requires structure, patience, and attention to detail. When these steps are followed, your renders become more realistic, professional, and visually compelling.`,coverImage:"/assets/steps-to-follow-to-start-an-archviz-render-in-3ds-max_cover.png",category:"ArchViz",tags:["3ds-max","archviz","rendering","workflow"],publishedAt:"2026-01-20"},{id:"5",title:"Proper UV Mapping and Common Mistakes Beginners Make",excerpt:"UV mapping is one of the most misunderstood parts of 3D. Learn how to create clean UVs and avoid the mistakes most beginners make.",content:`UV mapping is a critical step in 3D workflows, especially for ArchViz, game assets, and product visualization. Even with great models and textures, poor UVs can completely ruin the final result.

This article explains what proper UVs are, why they matter, and the most common mistakes beginners make when unwrapping their models.

## What Are Proper UVs?

UVs define how a 2D texture is projected onto a 3D model. Proper UVs ensure textures appear clean, consistent, and free of stretching or distortion.

Good UVs should be:
- Non-overlapping (unless intentionally tiled)
- Properly scaled
- Cleanly packed
- Free of stretching

## Why UV Mapping Is Important

UVs directly affect:
- Texture quality
- Material realism
- Render performance
- Workflow efficiency

In ArchViz and game art, bad UVs often result in blurry textures, visible seams, or inconsistent material scale.

## Common UV Mapping Mistakes Beginners Make

### 1. Ignoring Real-World Scale

One of the biggest mistakes is unwrapping without considering scale. This causes textures like wood, tiles, or bricks to look too large or too small compared to real life.

Always ensure UV scale matches real-world proportions.

### 2. Excessive Texture Stretching

Stretching happens when UVs are unevenly scaled or poorly relaxed.

Signs of stretching include:
- Blurry textures
- Distorted patterns
- Uneven texel density

Use checker maps to identify and fix stretching early.

### 3. Overlapping UVs by Accident

Overlapping UVs can cause texture artifacts, especially with baked maps or lightmaps.

While overlapping is sometimes acceptable for tiling materials, beginners often overlap unintentionally, leading to shading and texture errors.

### 4. Poor UV Seams Placement

Bad seam placement creates visible texture breaks.

Common seam mistakes:
- Seams in highly visible areas
- Random or unnecessary cuts

Always place seams in hidden or natural break areas like edges, corners, or underneath objects.

### 5. Inconsistent Texel Density

Texel density refers to how much texture detail each object receives.

Beginners often give small objects too much texture space and large objects too little, resulting in inconsistent detail across the scene.

Keep texel density consistent for similar objects.

### 6. Not Using a Checker Texture

Skipping checker textures is a common beginner habit.

Checker maps instantly reveal:
- Stretching
- Scaling issues
- Distortion

Always check UVs with a checker before applying final textures.

### 7. Overcomplicating Simple Objects

Not every object needs complex UVs.

Beginners often over-unwrap simple geometry when basic box mapping or planar mapping would work better. This wastes time and adds unnecessary complexity.

## Best Practices for Clean UVs

To improve your UV workflow:
- Use real-world scale
- Keep UV islands straight when possible
- Minimize seams
- Pack UVs efficiently
- Check UVs before texturing

Clean UVs make texturing faster and results more professional.

## Conclusion

Proper UV mapping is a foundational skill in 3D that separates beginners from professionals. By avoiding common mistakes and following clean UV practices, your textures will look sharper, more realistic, and easier to manage across any project.

Mastering UVs may take time, but it pays off in every render you create.`,coverImage:"https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",category:"3D Fundamentals",tags:["uv-mapping","beginners","3d-modeling","texturing"],publishedAt:"2026-01-22"},{id:"6",title:"Common Mistakes Beginners Make When Getting Into 3D as an Art",excerpt:"Starting out in 3D can be overwhelming. These are the most common artistic and mindset mistakes beginners make—and how to avoid them.",content:`Getting into 3D as an art form is exciting, but it can also be overwhelming. Many beginners focus heavily on software features while ignoring the artistic fundamentals that make 3D work visually compelling.

This article highlights the most common mistakes beginners make when learning 3D as an art—and how to avoid them early.

## 1. Focusing Too Much on Software, Not Art

One of the biggest mistakes beginners make is believing that mastering a specific software automatically makes them good artists.

3D tools are just tools. Without understanding composition, lighting, color, and form, even the most advanced software won’t produce great results.

## 2. Skipping Fundamentals

Many beginners rush into complex scenes without learning the basics.

Commonly skipped fundamentals include:
- Scale and proportion
- Basic lighting principles
- Color theory
- Composition

Strong fundamentals make every future project easier.

## 3. Comparing Yourself to Professionals Too Early

Social media exposes beginners to polished, high-end work daily.

Comparing your early work to artists with years of experience often leads to frustration and burnout. Progress in 3D is gradual and requires patience.

## 4. Trying to Learn Everything at Once

3D has many disciplines: modeling, texturing, lighting, animation, rendering, and more.

Beginners often try to learn everything simultaneously, leading to shallow understanding and slow progress. It’s better to focus on one area at a time.

## 5. Ignoring Reference Images

Working without references is a major beginner mistake.

References help with:
- Proportions
- Materials
- Lighting mood
- Real-world realism

Even professional artists rely heavily on references.

## 6. Expecting Instant Results

3D art has a steep learning curve.

Beginners often expect quick results and become discouraged when progress feels slow. Improvement comes from consistent practice, not speed.

## 7. Overloading Scenes With Detail

Adding too many details too early often makes scenes messy rather than impressive.

Good 3D art is about controlled detail and clear visual focus, not complexity for its own sake.

## 8. Avoiding Feedback and Critique

Many beginners hesitate to share their work.

Constructive feedback helps identify blind spots and accelerates learning. Avoiding critique slows growth.

## 9. Not Finishing Projects

Starting many projects but finishing none is extremely common.

Finished projects teach far more than abandoned ones—even if the result isn’t perfect.

## 10. Giving Up Too Early

3D is challenging, and frustration is part of the process.

Most beginners quit not because they lack talent, but because they underestimate how long improvement takes.

## Conclusion

Getting into 3D as an art requires patience, discipline, and a willingness to learn fundamentals. By avoiding these common mistakes, beginners can build stronger skills, improve faster, and enjoy the creative process more.

Consistency and curiosity matter more than perfection.`,coverImage:"https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=800&h=400&fit=crop",category:"3D Art",tags:["beginners","3d-art","learning","workflow"],publishedAt:"2026-01-24"},{id:"7",title:"How to Land a 3D Job Without Focusing on Money",excerpt:"Chasing money too early can slow your growth as a 3D artist. Here’s how focusing on skill, value, and learning helps you land real opportunities.",content:`When entering the 3D industry, many artists focus heavily on money—rates, salaries, and quick income. While earning a living is important, prioritizing money too early often holds artists back from landing real opportunities.

This article explains how shifting your focus away from money and toward value, skill, and growth can help you land a job in any 3D niche.

## Why Focusing on Money Too Early Is a Mistake

Money follows value, not the other way around.

When beginners prioritize income before skill, they often:
- Rush learning fundamentals
- Accept work they aren’t ready for
- Deliver inconsistent quality
- Damage their confidence and reputation

Early in your career, experience and skill growth are more valuable than short-term pay.

## 1. Choose Skill Over Salary

Your first 3D job doesn’t need to pay well—it needs to teach you.

Working on real projects exposes you to deadlines, feedback, revisions, and professional expectations. These experiences build skills that no tutorial can replace.

## 2. Build a Portfolio That Solves Problems

Studios don’t hire potential—they hire proof.

A strong portfolio:
- Shows finished work
- Focuses on quality, not quantity
- Matches the niche you want (ArchViz, games, VFX, product, etc.)
- Demonstrates problem-solving, not just visuals

One strong project is better than ten average ones.

## 3. Treat Every Opportunity as a Learning Investment

Early opportunities—internships, junior roles, small freelance jobs—are investments in your growth.

Instead of asking “How much does this pay?”, ask:
- What will I learn?
- Who will I work with?
- Will this improve my portfolio?

These factors compound over time.

## 4. Be Easy to Work With

Technical skill gets attention. Professional behavior gets hired.

Studios value artists who:
- Communicate clearly
- Take feedback well
- Meet deadlines
- Stay calm under pressure

Being reliable often matters more than being exceptionally talented.

## 5. Focus on One Niche First

Trying to be good at everything slows progress.

Pick one niche and go deep:
- ArchViz
- Game art
- Environment art
- Product visualization
- Motion graphics

Specialists are easier to hire than generalists—especially at junior levels.

## 6. Learn to Take Critique Without Ego

Feedback is not a personal attack—it’s a shortcut to improvement.

Artists who grow fastest are those who listen, adapt, and improve without defensiveness. This mindset makes you valuable in team environments.

## 7. Network by Adding Value, Not Asking for Jobs

Most jobs come through people, not applications.

Instead of asking for work:
- Share progress
- Ask smart questions
- Help others when possible
- Be visible and consistent

Relationships built this way lead to opportunities naturally.

## 8. Understand That Low Pay Is Temporary

Almost every successful 3D artist started underpaid or unpaid.

The difference between those who succeed and those who quit is understanding that early sacrifice is temporary. Skill growth compounds, and better opportunities follow.

## Conclusion

Landing a job as a 3D artist isn’t about chasing money—it’s about building value. When you focus on skill, learning, professionalism, and consistency, money becomes a byproduct, not the goal.

Think long-term. Invest in your craft. The career will follow.`,coverImage:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",category:"Career",tags:["3d-career","jobs","beginners","mindset"],publishedAt:"2026-01-26"}],R=[{id:"sr1",videoUrl:"https://vimeo.com/1154646820?fl=ip&fe=ec",title:"Showreel 2025",description:"A short compilation of selected works showcasing modeling, texturing, and lighting.",poster:"showreel-poster.jpg"},{id:"sr2",videoUrl:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",title:"Showreel — Breakdown",description:"Secondary showreel with process breakdowns and behind-the-scenes shots.",poster:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=60"}],r={about:z,resume:T,contact:B,projects:V,archvizProjects:U,productvizProjects:I,plugins:L,posts:q,showreel:R},W=r.projects||[],N=r.about,O=r.resume,E=r.contact,G=r.plugins||[],F=r.posts||[],H=r.showreel||[],_=r.archvizProjects||[],J=r.productvizProjects||[],f="./";function o(t){if(!t||typeof t!="object")return t;if(Array.isArray(t))return t.map(e=>o(e));const n={},i=e=>{if(!e||typeof e!="string")return!1;const s=e.toLowerCase();return s.startsWith("http")||s.startsWith("mailto:")||s.startsWith("data:")?!1:!!(/[.](png|jpe?g|svg|gif|webp|mp4|webm|glb|gltf|pdf|ico|jpg)$/i.test(s)||s.startsWith("/assets")||s.startsWith("assets/")||/poster|thumb|cover|profile|showreel/i.test(s)&&s.length<64)};for(const e of Object.keys(t)){const s=t[e];if(typeof s=="string"){const l=s,b=l.startsWith(f);if(i(l)&&!b){n[e]=`${f}${l.replace(/^\/?/,"")}`;continue}n[e]=s}else typeof s=="object"&&s!==null?n[e]=o(s):n[e]=s}return n}const K=o(W),$=o(N),Y=o(O),Z=o(E),Q=o(G),X=o(F),ee=o(H),te=o(_),ae=o(J),g=K,ne=$,se=Y,me=Z,ge=Q,ie=X,ue=ee,y=te;let c=ae.map(t=>({...t}));const d=[];function oe(t,n){const i=c.findIndex(e=>e.id===t);if(i!==-1)return c[i]={...c[i],...n},d.forEach(e=>e(c)),c[i]}function he(){function t(n){return y.find(i=>i.id===n)}return{projects:y,getProject:t}}function fe(){const[t,n]=m.useState(c);m.useEffect(()=>(d.push(n),()=>{const e=d.indexOf(n);e!==-1&&d.splice(e,1)}),[]);function i(e){return t.find(s=>s.id===e)}return{projects:t,getProject:i,updateProject:oe}}function ye(t){return g.find(n=>n.id===t)}function be(t){return ie.find(n=>n.id===t)}function ve(){function t(n){return g.find(i=>i.id===n)}return{projects:g,getProject:t}}function we(){return{aboutData:ne}}function ke(){return{resumeData:se}}export{pe as L,ie as a,y as b,c,ge as d,ke as e,fe as f,ve as g,he as h,ye as i,me as j,be as k,g as p,ue as s,we as u};
