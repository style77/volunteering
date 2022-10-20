import OrganisatorVolunteeringBox from "../components/organisatorVolunteeringBox";

export const OrganisatorPanel = () => {
  return (
    <>
      <main>
        <OrganisatorVolunteeringBox
          volunteeringName="DSUpa"
          orgName="chuj"
          city="dasda"
          isPaid={false}
          volunteeringType="typ sportowy"
          volunteeringTerm="termy"
          volunteeringImage=""
          description="das"
          participantsCounter={3}
        ></OrganisatorVolunteeringBox>
      </main>
    </>
  );
};
export default OrganisatorPanel;
