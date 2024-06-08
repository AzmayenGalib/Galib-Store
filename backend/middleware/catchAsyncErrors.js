module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
/* akhane resolve method ta try er moto kaz korbe.akhane thefunc
muoto ai exported arrow function er akta callback function.ar ai
exported arrow function ta mulot arekta arrow function k 
return kore akhane 2ta arrow function ase vitorer ta holo nasted 
arrow function.ai exported arrow function use korar kaaron holo
er argument a kono async funtion pass korle ata sai async func
er error k handel kore diba.fole protita async function er 
zonno bar bar koso kore try catch likha error handle korte hobena
borong async func gilak sudhu ai arrow er modda pass kore dilai hobe*/

/* ai exported arrow ffunc er kaz holo er modda zai async func 
input dibo sai async func er modda kono error hole sai 
error k handle kora ar zodi kono error na ase tale oi
async funck zaita return korbe saitak return kore daua  */

/* try ba resolve er modda zodi schema ba model class
releted kono error hoy zmn req korar somoy client thaka
kono required propery zodi na dai
req body er modda
tale schema diclare korar somoy zai
zai error message diyasilam ba erroer handling korasilam
sai error message ta ErrorHander class er modda pass hobe
akadhik error hola ata string er moddai akadhik error message show
hobe */