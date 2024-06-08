class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    
    this.queryStr = queryStr;
    
    /* url a ? er por za thake saita holo querystr
        ar model class er method gula holo query.
        amra zokhon client thaka server req kori tokhon 
        query perams er modda akta key o tar akta value 
        pathate pari */
    /* akhane query ar queryStr era holo property
    ader value holo obj */
  }
  /* implementing search feature */
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
            /* akhane keyword holo client thaka pathano key er akta nam 
            ar req.query.keyword diy amra keyword key er value k 
             access korte pari*/
            /* akhane name holo find method er akta filter 
                obj .mone rakhbo nosql er find mrthod ar 
                mongoose er model cass er find method era same 
                zinis .$options:"i" er mane holo search ta hobe
                case-incensitive.avabe filter obj diya 
                amra searching system banate pari */
          },
          /* zahatu filter obj a kbl name property disi
          tai amra sudhu obj er name diyai obj ba json data 
          k search korrte parbo.onno kisu diya search korta parbona*/
        }
      : {};

    this.query = this.query.find({ ...keyword });
    
    /* akhane amra ai class er quary er value k 
      change kore dilam {...keyword} atar maddoma keyword  obj 
      k find er filter obj er modda copy kora dilam */

    /* find za kabl matro model class er e method ta noy
      borong find method zai obj k return korbe taro find
      method ase zeta diya oi obj er modda 
      filter kora kono obj k khuza ber kora zay  */

    /*  akhane query kintu ApiFeatures er kono method noy
      ata akta property ApiFeatures k cal korar somor
      1st argument zai function call pass korbo sai function
      zai value return korbe satai hobe query er value.ar upore
       find method zai value return korbe satai hobe query er value */

    return this;
    //amra ai class kai return kora dilam
  }

  /* emplimenting filter feature */
  filter() {
    const queryCopy = { ...this.queryStr };
    //removing some fields for category
    /* console.log(queryCopy) */
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    /*  delete queryCopy[key] avabe obj taka amra 
        property delete korta pari.akhane query obj er copy thaka
        amra  "keyword", "page", "limit" ai 3ta property k 
        delete korlam */

        console.log(queryCopy);
    // filter for price and rating:
    let queryStr = JSON.stringify(queryCopy)
    /* akhane qurycopy k string a convert kore nilam */
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`);
    /* mongo db ta amn zai property diya search korbo tar age
    $lagate hoy tai amra kahane $ add korlam */ 


    this.query= this.query.find(JSON.parse(queryStr));
    /* $add korar pore amra abar atak obj a convert kora niam */
    
    return this;
  }

    /* amra client thaka zai key ta pathai seta req.query obj
    er akta property hoya zay but zodi chai za amra client
    thaka zai key ta pathabo seta req.query obj er akta 
    nasted obj hoye zak eta korar upay:
    objname[propertyName1] = value1 
    objname[propertyName2] = value2
    objname[propertyName3] = value3
    avabe same namer onek gula key pathte hobe zader value
    alada alada hobe key name er [] er modda zata dibo
    seta hobe oi obj er property.
    fola smae namer key gulor name req.query obj er vitor nasted
    obj creat hobe.*/

    /* find method er vitor zai filter obj dibo tar property 
    er value zodi filter obj nasted obj hoy tale nasted obj 
    er modda zai oi property er zai range dibo sai range er
    vitor zai data gulo thakbe find method tader k return korba
    aivabe amra data er kono akta property er value er range
    diyau search korta pari zmn
    price[gt]= 6
    price[lt]=50
    ata dila {price:{gt:6,lt:50}} amn akta query obj 
    creat hobe fola price value 6 tahaka 50 er modda zaai 
    data gula ase sagulai find method return korbe*/

   /*  key ta zodi propertyName1 lakhi tale 
    value1 er thaka boro value diya search hobe.ar zodi
    propertyName1e lakhi tale value1 er greaterequal >= value
    gula diya search hobe */

    /* zodio ai filter method price diya filter er zonnnau kaz kore
    sudhu price na zakono kisu diyai filter kora zay ai method 
    er sahazze.but amra exact price na diya price er range diya
    filter korta chai*/
     
   
    /* name diya khoza k bola hoy searching ar name bade
    data er onno kono property diya khoza k bola hoy filter kora.
    akhane queryCopy holo find 
    er filter obj .zahatu queryCopy er modda sudhu category
    property thakbe tai akhane categori diya search hobe 
    zodi category bade onno kono key pathai tale saita diyau 
    akhane search hobe.   */
    
  
  /* find method 1st a sob data kai return kore.trapor search
  method er find sob datar moda thaka keyword zukto data
  gulo k return kore tarpor filter method er find method
  abar search method er find method zai data gulo
  k return korbe sudhu sai data gulor modda thaka categori zukto
  data gulo return korbe.fole search method er query holo
  collection er subset ar filter method er query holo
  search method er query er subset tai filter method er query
  kintu collection er prottokkho ba direct subset noy
  borong prokkho subset.zodi keyword na pathai tokhon  */


  /* fole keyword pathale serach kaz kore ar category pathale 
  filter kaz kore ar zodi keyword ar category duitai pathai 
  tale search ar filter duitai kaz korbe */


   pagination(resultPerPage){
     const currentPage = Number(this.queryStr.page) || 1 ;
     const skip = resultPerPage * (currentPage-1) ;
     this.query = this.query.limit(resultPerPage).skip(skip);
     /* limit er man zoto sorbocco totgulo data client a zabe */
     
     return this;
     
   }


}

module.exports = ApiFeatures;
