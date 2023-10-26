import LogoSvg from "../../assets/svgs/logoLoadingIndicator";
import styled from "styled-components/native";


const LoadingContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;
export const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <LogoSvg width={100} height={120} />
    </LoadingContainer>
  );
};
