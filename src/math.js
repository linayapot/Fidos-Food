//javascript

//mer_factors['Intact Adult'])
const mer_factors = 
// myKey:MyValue
{ 
    'Neutered Adult':1.6,
    'Intact Adult':1.8,
    'Inactive':1.2,
    'Active, Light':2,
    'Active, Medium':3,
    'Active, Heavy':4,
    'Puppy (0 - 3 months)':3,
    'Puppy( 4 - 12 months)':2

};

const bw=22;
//mbw = metabolic body weight
const mbw = bw**0.75;

export function unitconv (weight,unit){
    if (unit == "lb"){
        return  weight*0.45359237}
    if (unit == "oz"){
        return  weight*28.34952}
    else{
        return weight;
    }
}

export function ME_Req (bw,fct){

    let RER;
     //let fct;
   // fct =  parseFloat(factor)

    if ((bw > 45)|| (bw < 2 )){ 
        RER = 70*(bw**0.75);} 
    else{
        RER= 30*bw+70;        }

   const MER = RER*fct;

return Math.round(MER);

}

const conv=2.2046226218;



//recommended allowances

export const rec_intake = 
// myKey:MyValue
{
    'cp':3.28,
    'Arg': 0.11,
    'His':0.062,
    'Iso':0.12,
    'Met':0.11,
    'Metcys':0.21,
    'Leu':0.22,
    'Lys':0.11,
    'Phe':0.15,
    'PheTyr':0.24,
    'Thr':0.14,
    'Try':0.046,
    'Val':0.16,
        
    'tfat':1.8,
    'la':0.36,
    'ala':0.014,
    'epa_dha':0.03,

    'Ca':0.13,
    'P':0.1,
    'Mg':0.0197,
    'Na':0.0262,
    'K':0.14,
    'Cl':40,
    'Fe':1,
    'Cu':0.2,
    'Zn':2,
    'Mn':0.16,
    'Se': 11.8,
    'I': 29.6,

    'vitA':50,
    'vitD':0.45,
    'vitE':1,
    'vitk':0.054,

    'thi':0.074,
    'rib':0.171,
    'pyr':0.049,
    'nia':0.57,
    'pan':0.49,
    'b12':1.15,
    'cho':56,
    'fol':8.9
}


//minimum allowances
export const min_req = 
// myKey:MyValue
{
    'cp':2.62,
    'arg':0.092,
    'his':0.048,
    'iso':0.098,
    'met':0.085,
    'metcys':0.17,
    'leu':0.18,
    'lys':0.092,
    'phe':0.12,
    'phythr':0.19,
    'thr':0.11,
    'try':0.036,
    'val':0.13,
    'ca':0.059,
    'mg':5.91,
    'na':9.85,
    'i':23.6,
    'rib':0.138
}

//adequate intake
export const adq_req = 
// myKey:MyValue
{
    'tfat':1.3,
    'ala':0.012,
    'la':0.3,
    'epa_dha':0.03,

    'p':0.1,
    'k':0.14,
    'cl':40,

    'fe':1,
    'cu':0.2,
    'zn':2,
    'mn':0.16,
    'se':11.8,
    'vitA':40,
    'vitd':0.36,
    'vite':0.8,
    'vitk':0.043,

    'thi':0.059,
    'pyr':0.04,
    'nia':0.45,
    'pan':0.39,
    'b12':0.92,
    'cho':45,
    'fol':7.1
}

//safe upper limit
export const SUL = 
// myKey:MyValue
{
    'tfat':10.8,
    'la':2.1,
    'epa_dha':0.37,
    'vitA':2099,
    'Vitd':2.6,
}

export const units=
{
    'cp':'g',
    'Arg':'g',
    'His':'g',
    'Iso':'g',
    'Met':'g',
    'Metcys':'g',
    'Leu':'g',
    'Lys':'g',
    'Phe':'g',
    'PheTyr':'g',
    'Thr':'g',
    'Try':'g',
    'Val':'g',
        
    'tfat':'g',
    'la':'g',
    'ala':'g',
    'epa_dha':'g',
    
    'Ca':'g',
    'P':'g',
    'Mg':'g',
    'Na':'g',
    'K':'g',
    'Cl':'mg',
    'Fe':'mg',
    'Cu':'mg',
    'Zn':'mg',
    'Mn':'mg',
    'Se':'μg',
    'I':'μg',
    
    'vitA':'RE', //change to RE
    'vitD':'μg',
    'vitE':'mg',
    'vitk':'mg',
    
    'thi':'mg',
    'rib':'mg',
    'pyr':'mg',
    'nia':'mg',
    'pan':'mg',
    'b12':'μg',
    'cho':'mg',
    'fol':'μg'  
}

export const names=
{
    'cp':'Crude Protein',
    'Arg':'Arginine',
    'His':'Histidine',
    'Iso':'Isoleucine',
    'Met':'Methionine',
    'Metcys':'Methionine & Cysteine',
    'Leu':'Leucine',
    'Lys':'Lysine',
    'Phe':'Phenylalanine',
    'PheTyr':'Phenylalanie & Tyrosine',
    'Thr':'Threonine',
    'Try':'Tryosine',
    'Val':'Valine',
        
    'tfat':'Total Fat',
    'la':'Linoleic Acid',
    'ala':'Alpha Linoleic Acid',
    'epa_dha':'EPA & DHA',
    
    'Ca':'Calcium',
    'P':'Phosphorous',
    'Mg':'Magnesium',
    'Na':'Sodium',
    'K':'Potassiume',
    'Cl':'Chlorine',
    'Fe':'Iron',
    'Cu':'Copper',
    'Zn':'Zinc',
    'Mn':'Manganese',
    'Se':'Selenium',
    'I':'Iodine',
    
    'vitA':'Vitamin A',
    'vitD':'Vitamin D',
    'vitE':'Vitamin E',
    'vitk':'Vitamin K',
    
    'thi':'Thiamine',
    'rib':'Riboflavin',
    'pyr':'Pyridoxine',
    'nia':'Niacin',
    'pan':'Panthothenic Acid',
    'b12':'B12',
    'cho':'Choline',
    'fol':'Folate'  
}

export function ME_Intake(kcal, AFI){
        return Math.round((AFI/1000)*kcal);}

//console.log("Your dog's base MER is "+ ME_Req(22,'Neutered Adult'));

//Object.values(rec_intake).forEach(val => console.log(val*mbw));

