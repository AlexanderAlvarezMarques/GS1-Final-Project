(this["webpackJsonpgs1-final"]=this["webpackJsonpgs1-final"]||[]).push([[0],{35:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n(4),r=n.n(a),o=n(28),i=n.n(o),s=(n(35),n(16)),j=n(21);n(40).config();j.a.initializeApp({apiKey:"AIzaSyBA_KEVb8kHAEqFJHQNyfloh9YecPLBSrs",authDomain:"gs1-project-a2d2a.firebaseapp.com",databaseURL:"https://gs1-project-a2d2a.firebaseio.com",projectId:"gs1-project-a2d2a",storageBucket:"gs1-project-a2d2a.appspot.com",messagingSenderId:"145374141673",appId:"1:145374141673:web:20a7755aa658ac6ec82478",measurementId:"G-WJ2HRTQ56K"});var l=j.a.auth(),b=j.a.firestore(),d=n(20),m=n(24),h=n(7),u=function(){var e=Object(h.f)(),t=Object(a.useState)({nombre:"juanma",apellido:"perez",dni:"12345678E",correo:"juanma@gmail.com","contrase\xf1a":"123456",fechaCarnet:"10/02/2019",nacimiento:"5/02/1997",marca:"toyota",modelo:"yaris",matricula:"1234FTG"}),n=Object(s.a)(t,2),r=n[0],o=n[1],i=Object(a.useState)(!1),j=Object(s.a)(i,2),u=j[0],p=j[1],x=function(e){o(Object(m.a)(Object(m.a)({},r),{},Object(d.a)({},e.target.name,e.target.value)))},O=r.nombre,g=r.apellido,f=r.dni,C=r.correo,I=r.fechaCarnet,y=r.contrase\u00f1a,v=r.nacimiento,S=r.marca,F=r.modelo,A=r.matricula,N={marca:S,modelo:F,matricula:A},w={nombre:O,apellido:g,dni:f,correo:C,fechaCarnet:I,nacimiento:v,"contrase\xf1a":y,vehiculos:[N.marca,N.modelo,N.matricula]};return Object(c.jsxs)(a.Fragment,{children:[Object(c.jsx)("h2",{children:"Sign In Form"}),u?Object(c.jsx)("p",{children:"Todos los campos deben estar rellenos"}):null,Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault(),""!==O.trim()&&""!==g.trim()&&""!==f.trim()&&""!==C.trim()&&""!==y.trim()&&""!==I.trim()&&""!==F.trim()&&""!==v.trim()&&""!==S.trim()&&""!==F.trim()&&""!==A.trim()?(p(!1),l.createUserWithEmailAndPassword(C,y).then((function(t){var n=b,c=l.currentUser.uid;n.collection("bd").doc(c).set(w).then((function(){console.log("Todo correcto"),e.push("/")})).catch((function(e){console.log("hubo un error: ",e)}))})).catch((function(e){var t=e.code;console.log(t);var n=e.message;console.log(n)}))):p(!0)},children:[Object(c.jsx)("label",{children:"Nombre: "}),Object(c.jsx)("input",{type:"text",name:"nombre",onChange:x}),Object(c.jsx)("label",{children:"Apellido: "}),Object(c.jsx)("input",{type:"text",name:"apellido",onChange:x}),Object(c.jsx)("label",{children:"DNI: "}),Object(c.jsx)("input",{type:"text",name:"dni",onChange:x}),Object(c.jsx)("label",{children:"Correo: "}),Object(c.jsx)("input",{type:"text",name:"correo",onChange:x}),Object(c.jsx)("label",{children:"contrase\xf1a: "}),Object(c.jsx)("input",{type:"text",name:"contrase\xf1a",onChange:x}),Object(c.jsx)("label",{children:"Nacimiento: "}),Object(c.jsx)("input",{type:"date",name:"nacimiento",onChange:x}),Object(c.jsx)("label",{children:"Fecha Carnet: "}),Object(c.jsx)("input",{type:"date",name:"fechaCarnet",onChange:x}),Object(c.jsx)("label",{children:"Marca: "}),Object(c.jsx)("input",{type:"text",name:"marca",onChange:x}),Object(c.jsx)("label",{children:"Submodel: "}),Object(c.jsx)("input",{type:"text",name:"modelo",onChange:x}),Object(c.jsx)("label",{children:"Matricula: "}),Object(c.jsx)("input",{type:"text",name:"matricula",onChange:x}),Object(c.jsx)("button",{type:"submit",children:"Registrarse"})]})]})},p=n(13),x=function(){return Object(c.jsxs)(a.Fragment,{children:[Object(c.jsx)("h1",{children:"P\xe1gina Principal"}),Object(c.jsx)(p.b,{to:"/logIn",children:"Iniciar sesi\xf3n"}),Object(c.jsx)("br",{}),Object(c.jsx)(p.b,{to:"/signUp",children:"Crear cuenta"}),Object(c.jsx)("br",{}),Object(c.jsx)(p.b,{to:"/Incidences",children:"Incidencia"})]})},O=function(){Object(h.f)();return Object(c.jsxs)(a.Fragment,{children:[Object(c.jsx)("h2",{children:" Log In"}),Object(c.jsxs)("form",{children:[Object(c.jsx)("label",{children:"Nombre de usuario: "}),Object(c.jsx)("input",{type:"text",name:"userName"}),Object(c.jsx)("br",{}),Object(c.jsx)("label",{children:"Contrase\xf1a"}),Object(c.jsx)("input",{type:"password",name:"passwd"})]})]})},g=function(){return Object(c.jsxs)(a.Fragment,{children:[Object(c.jsx)("h1",{children:"Mis incidencias"}),Object(c.jsx)("label",{children:" AQUI IRIAN LAS INCIDENCIAS"}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{onClick:function(e){window.location.href="/newIncidence"},children:" Nueva reclamaci\xf3n"}),Object(c.jsx)("br",{}),Object(c.jsx)(p.b,{to:"/logIn",children:"Volver"})]})};var f=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=(t[0],t[1],Object(a.useState)(!1)),r=Object(s.a)(n,2);return r[0],r[1],Object(c.jsx)(p.a,{children:Object(c.jsxs)(h.c,{children:[Object(c.jsx)(h.a,{exact:!0,path:"/",component:x}),Object(c.jsx)(h.a,{exact:!0,path:"/signUp",component:u}),Object(c.jsx)(h.a,{exact:!0,path:"/logIn",component:O}),Object(c.jsx)(h.a,{exact:!0,path:"/Incidences",component:g})]})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(f,{})}),document.getElementById("root")),C()}},[[47,1,2]]]);
//# sourceMappingURL=main.59b46f5d.chunk.js.map