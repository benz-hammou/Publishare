import React from "react";

const BackUpPost = () => {
  return (
    <>
      <div className="article_cards max-h-maxOneThirdScreen md:flex-row xl:h-maxOneThirdScreen">
        <div className="img_cards_container md:mb-0 md:min-w-40% ">
          <img
            src="https://media.istockphoto.com/id/813136942/photo/selective-focus-of-stacking-magazine-place-on-table-in-living-room.jpg?s=612x612&w=0&k=20&c=6nRlgDo9ecsb1vCPlN8G4cmq4vf8lW4YkSMhoU-jSqE="
            alt="desk"
            className=" aspect-21/6 md:aspect-16/13 lg:aspect-4/3 xl:aspect-auto"
          />
        </div>
        <div className="texts_container md:self-start md:max-w-55%">
          <h2>
            FedNow may finally be live, but will it be too costly for businesses
            to adopt?
          </h2>
          <p className="info">
            <a className="autor font-semibold mr-2">Matiaz Plasco</a>
            <time>24-07-2023, 15:54</time>
          </p>
          <p className="summary xl:text-xl">
            Welcome to The Interchange! If you want this in your inbox, sign up
            here. It was an event-filled week in the fintech world, what with
            FedNow launching, the former CEO of fintech Bolt.
          </p>
        </div>
      </div>

      <div className="article_cards max-h-maxOneThirdScreen md:flex-row xl:h-oneThirdScreen">
        <div className="img_cards_container md:mb-0 md:min-w-40%">
          <img
            src="https://techcrunch.com/wp-content/uploads/2022/10/GettyImages-1242979336.jpg?w=1390&crop=1"
            alt="money"
            className=" aspect-21/6 md:aspect-16/13 lg:aspect-4/3 xl:aspect-auto"
          />
        </div>
        <div className="texts_container md:self-start md:max-w-55%">
          <h2>That’s capitalism, baby !</h2>
          <p className="info">
            <a className="autor font-semibold mr-2">Petr Yan</a>
            <time>12-08-2023, 12:34</time>
          </p>
          <p className="summary xl:text-xl">
            Hello and welcome back to Equity, a podcast about the business of
            startups, where we unpack the numbers and nuance behind the
            headlines. This is our Friday show, when we take a look at the
            week’s biggest startup and tech news, and have a little fun at the
            same time.
          </p>
        </div>
      </div>

      <div className="article_cards max-h-maxOneThirdScreen md:flex-row xl:h-maxOneThirdScreen">
        <div className="img_cards_container md:mb-0 md:min-w-40%">
          <img
            src="https://iamafoodblog.b-cdn.net/wp-content/uploads/2019/11/oven-baked-perfect-tonkatsu-8822.jpg"
            alt="food dish"
            className=" aspect-21/6 md:aspect-16/13 lg:aspect-4/3 xl:aspect-auto"
          />
        </div>
        <div className="texts_container md:self-start md:max-w-55%">
          <h2>
            Chicken katsu has got to be one of my all time favorite things to
            make and eat.
          </h2>
          <p className="info">
            <a className="autor font-semibold mr-2">Rachid Malah</a>
            <time>22-10-2022, 11:11</time>
          </p>
          <p className="summary xl:text-xl">
            It’s like shake and bake chicken but holy heck, so much better!
            Juicy, tender chicken, with crispy panko breadcrumbs on the outside,
            fluffy rice and crunchy cabbage?! Dream meal! Almost every culture
            has a breaded chicken cutlet and I love them all but chicken katsu
            has a special little katsu shape in my heart.
          </p>
        </div>
      </div>

      <div className="article_cards max-h-maxOneThirdScreen md:flex-row xl:h-maxOneThirdScreen">
        <div className="img_cards_container md:mb-0 md:min-w-40%">
          <img
            src="https://www.myglobalviewpoint.com/wp-content/uploads/2020/02/A-Day-in-Dozza-Italy-585x398.jpg"
            alt="medieval city"
            className=" aspect-21/6 md:aspect-16/13 lg:aspect-4/3 xl:aspect-auto"
          />
        </div>
        <div className="texts_container md:self-start md:max-w-55%">
          <h2>
            A day in DOZZA: one of the ITALY’S most beautiful medieval village
          </h2>
          <p className="info">
            <a className="autor font-semibold mr-2">Celine Vanhof</a>
            <time>30-05-2023, 12:10</time>
          </p>
          <p className="summary xl:text-xl">
            Just south of Bologna, the capital of Italy’s Emilia Romagna region,
            lies a dreamy medieval village called Dozza. It’s one of the Borghi
            piu belli d’italia, an association of the best-preserved and most
            beautiful Italian villages, yet it’s totally off the radar for most
            travelers.
          </p>
        </div>
      </div>
    </>
  );
};

export default BackUpPost;
