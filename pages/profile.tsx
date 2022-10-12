import { NextPage } from "next";

const Profile: NextPage = () => {
  return (
    <>
      <main className="font-inter flex min-h-screen flex-col py-2 text-main-color">
        <div className="font-semibold text-4xl xl:text-6xl my-6 ml-6">
          Twój profil
        </div>
        <div className="flex flex-rowtext-3xl text-regular my-6 ml-6">
          <div>tu ma byc zdj</div>
          <div className="flex flex-col">
            <span className="font-semibold">ADAM OKNO</span> <br />
            okno@mail.com
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col">
            <div>Bydgoszcz</div>
            <div>Organizator</div>
            <div>17 lat</div>
          </div>
          <div className="flex flex-col">
            <div>Odbyte Wolontariaty</div>
            <div>Na volunteering od:</div>
            <div>Zainteresowania</div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Profile;

// select organizator wolonariusz
