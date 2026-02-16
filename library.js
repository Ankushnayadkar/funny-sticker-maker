function remix(arr) {
let out = [];
const emoji = ["😂","🔥","😎","💀","✨","🚀","👀","🤣","❤️","☕","🎉"];

for (let i = 0; i < 20; i++) {
arr.forEach(line => {
const e = emoji[Math.floor(Math.random()*emoji.length)];
out.push(line + " " + e);
});
}
return out;
}

const LIBRARY = {
funny: remix(["Life is short laugh louder","Too tired to function","Brain loading","Why am I like this","Certified overthinker"]),
savage: remix(["I said what I said","Stay mad","Built different","Unbothered","Energy unmatched"]),
insulting: remix(["Skill issue","Upgrade your brain","Try again later","System error human","Beta version"]),
wishes: remix(["Good morning legend","Rise and shine","Make today epic","Stay blessed","Winning mood"]),
hindi: remix(["Zindagi mast hai","Sab moh maya hai","Full swag","Bindass life","No tension"]),
festival: remix(["Happy Diwali","Happy Holi","Eid Mubarak","Merry Christmas","Happy New Year"])
};
