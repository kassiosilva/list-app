import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  height: 400px;
  width: 50%;
  padding: 77px;
  background-color: #fff;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);

  a {
    margin-top: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
`;
