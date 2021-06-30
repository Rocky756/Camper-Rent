const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../db/connect');
const AddModel = require('../models/addModel');
const dbUrl = 'mongodb+srv://Ruslan:1234@cluster0.3bt6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function main() {
  await mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
  // await connect.connect();
  const adds = [
    {
      title: "ADRIA Aviva 360 DK",
      specification: {
        brand: 'Adria',
        model: 'Aviva',
        engine: 'diesel',
        color: 'Белый',
        year: 2021,
        sleepingPlace: '4 / 5',
        country: 'Словения',
        condition: 'Новый',
        driverLicense: 'В',
      },
      price: 7000,
      description: 'Легкий, компактный и маневренный – все это можно сказать о прицепе-даче Adria Aviva. Но пусть вас не обманывают его скромные габариты. Уже в базовой комплектации каравана Adria Aviva предусмотрены: трансформируемая мебель (диваны, стол), светильники, цистерна для чистой воды с погружным электронасосом, санузел, включающий в себя биотуалет с электросмывом, умывальник, универсальный смеситель со шлангом для принятия душа, полочки, зеркало, шкаф для умывальных принадлежностей.Многие запомнили этот караван именно благодаря его легкому весу в 750 кг, который позволяет водителю управлять таким автопоездом с категорией «В» (легковой).', 
      region: 'Горно-Алтайск',
      mainImage: 'https://autoyahta.ru/uploads/gallery/40/IMG_39131_prev.jpg',
      image1:'https://autoyahta.ru/uploads/gallery/40/IMG_39211_prev.jpg',
      image2:'https://autoyahta.ru/uploads/gallery/40/IMG_39381_prev.jpg',
      image3:'https://autoyahta.ru/uploads/gallery/40/IMG_39221_prev.jpg',
      image4:'https://autoyahta.ru/uploads/gallery/40/IMG_39362_prev.jpg',
      category: 'Жилой прицеп',
      author: 'Rocky',
      calendar: Date,
      contacts: '+7(999)-777-88-99',
    },

    {
      title: "HYMER T-Class S 680",
      specification: {
        brand: 'Hymer',
        model: 'T 680 S',
        engine: 'diesel',
        color: 'Белый',
        year: 2021,
        sleepingPlace: '5',
        country: 'Германия',
        condition: 'Новый',
        driverLicense: 'В',
        gearbox: 'АКПП',
      },
      price: 25000,
      description: 'Новый HYMER T-Class S во многом является первым в своем роде. Интерьер может похвастаться уютной атмосферой с современными дизайнерскими штрихами, типичными для HYMER, продуманной концепцией освещения, а также особенно щедрым ощущением пространства. Это также первая из 3,5-тонных моделей, основанная на проверенном и технологически превосходном переднеприводном шасси Mercedes-Benz с оригинальной рамой. Благодаря простому управлению, он также является идеальным для тех, кто хочет войти в мир высококлассного автоспорта.', 
      region: 'Москва',
      mainImage: 'https://autoyahta.ru/uploads/gallery/461/Hymer_T-class_S_680_prev.jpg',
      image1:'https://www.hymer.com/hymer/produktbilder/2020_01/grundrisse-hymer/tramp-s/tramp-s-quer/image-thumb__10380__floorplan-detail-hymer/tramp-s-680-mj20.jpg',
      image2:'https://autoyahta.ru/uploads/gallery/461/hy20_ts_695_den_tippri_i_ablage@2x_prev.jpg',
      image3:'https://autoyahta.ru/uploads/gallery/461/hy20_ts_680_kor_tippri_i_sitzgruppe_prev.jpg',
      image4:'https://autoyahta.ru/uploads/gallery/461/hy20_ts_680_kor_tippri_i_bad_prev.jpg',
      category: 'Полуинтегрированный автодом',
      author: 'Rocky',
      calendar: Date,
      contacts: '+7(999)-777-88-99',
    },

    {
      title: "SUN LIVING Lido A45DK",
      specification: {
        brand: 'SUN LIVING',
        model: 'Lido',
        engine: 'diesel',
        color: 'Белый',
        year: 2017,
        sleepingPlace: '7',
        country: 'Словения',
        condition: 'Технически исправен',
        driverLicense: 'В',
        gearbox: 'АКПП',
      },
      price: 18000,
      description: 'SUN LIVING Lido - удобный, надежный автодом на 7 человек для путешествий всей семьей.', 
      region: 'Сочи',
      mainImage: 'https://autoyahta.ru/uploads/gallery/306/DSC00325_prev.JPG',
      image1:'https://autoyahta.ru/uploads/gallery/306/DSC00326_prev.JPG',
      image2:'https://autoyahta.ru/uploads/gallery/306/DSC00331_prev.JPG',
      image3:'https://autoyahta.ru/uploads/gallery/306/DSC00332_prev.JPG',
      image4:'https://autoyahta.ru/uploads/gallery/306/DSC003341_prev.JPG',
      category: 'Альковный автодом',
      author: 'Rocky',
      calendar: Date,
      contacts: '+7(999)-777-88-99',
    },

    {
      title: "Challenger Sirius, 2077",
      specification: {
        brand: 'Challenger Sirius',
        model: '2077',
        engine: 'diesel',
        color: 'Белый',
        year: 2020,
        sleepingPlace: '4',
        country: '	Франция',
        condition: 'Технически исправен',
        driverLicense: 'В',
        gearbox: 'АКПП',
      },
      price: 18000,
      description: 'Challenger Sirius, 2077 - автодом (дом на колесах) на 4 человека с ниспадающей и односпальными кроватями, отдельной душевой кабиной. Туалет расположен в центре прицепа. Автодом имеет душ, холодильник и газовую плиту. Он идеально подходит для загородного отдыха, путешествий с семьей, краткосрочных путешествий и путешествий по России.', 
      region: 'Краснодар',
      mainImage: 'data:image/jpeg;base64,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',
      image1:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic2_big.jpg',
      image2:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic3_big.jpg',
      image3:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic7_big.jpg',
      image4:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic5_big.jpg',
      category: 'Интегрированный автодом',
      author: 'Rocky',
      calendar: Date,
      contacts: '+7(999)-777-88-99',
    },

    {
      title: "BUERSTNER Argos Time A660",
      specification: {
        brand: 'BUERSTNER',
        model: 'Argos Time A660',
        engine: 'diesel',
        color: 'Белый',
        year: 2013,
        sleepingPlace: '6',
        country: '	Германия',
        condition: 'Технически исправен',
        driverLicense: 'В',
        gearbox: 'МКПП',
      },
      price: 13000,
      description: 'Путешественники, выбирающиеся в тур с детьми на каникулы, должны быть готовы ко всему. Argos time полностью укомплектован и готов для приключений. Тщательно продуманный и разработанный для всей семьи интерьер с множеством вариантов планировки скрывается за привлекательным и стильным корпусом. А обширные возможности для хранения вещей позволят детям и взрослым взять с собой в путешествие все, что нужно, чтобы чувствовать себя как дома.', 
      region: 'Симферополь',
      mainImage: 'data:image/jpeg;base64,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',
      image1:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic2_big.jpg',
      image2:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic3_big.jpg',
      image3:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic7_big.jpg',
      image4:'https://domvdorogu.ru/_vehicles/Challenger_Sirius_2019/additional_pic5_big.jpg',
      category: 'Альковный автодом',
      author: 'Rocky',
      calendar: Date,
      contacts: '+7(999)-777-88-99',
    },
    {
      title: "ADRIA Aviva 360 DK",
      specification: {
        brand: 'Adria',
        model: 'Aviva',
        engine: 'diesel',
        color: 'Белый',
        year: 2021,
        sleepingPlace: '4 / 5',
        country: 'Словения',
        condition: 'Новый',
        driverLicense: 'В',
      },
      price: 7000,
      description: 'Легкий, компактный и маневренный – все это можно сказать о прицепе-даче Adria Aviva. Но пусть вас не обманывают его скромные габариты. Уже в базовой комплектации каравана Adria Aviva предусмотрены: трансформируемая мебель (диваны, стол), светильники, цистерна для чистой воды с погружным электронасосом, санузел, включающий в себя биотуалет с электросмывом, умывальник, универсальный смеситель со шлангом для принятия душа, полочки, зеркало, шкаф для умывальных принадлежностей.Многие запомнили этот караван именно благодаря его легкому весу в 750 кг, который позволяет водителю управлять таким автопоездом с категорией «В» (легковой).', 
      region: 'Горно-Алтайск',
      mainImage: 'https://autoyahta.ru/uploads/gallery/40/IMG_39131_prev.jpg',
      image1:'https://autoyahta.ru/uploads/gallery/40/IMG_39211_prev.jpg',
      image2:'https://autoyahta.ru/uploads/gallery/40/IMG_39381_prev.jpg',
      image3:'https://autoyahta.ru/uploads/gallery/40/IMG_39221_prev.jpg',
      image4:'https://autoyahta.ru/uploads/gallery/40/IMG_39362_prev.jpg',
      category: 'Жилой прицеп',
      author: 'Rocky',
      calendar: Date,
      contacts: '+7(999)-777-88-99',
      status: 'archive',
    },
    
  ];
  await AddModel.insertMany(adds);
  await mongoose.disconnect();
}

main();