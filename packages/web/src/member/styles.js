import styled from 'styled-components';
import { Grey5 } from 'xi-core/colours';

export const SettingsMenuWrapper = styled.div`
  width: 400px;
  background-color: #fbfbfb;
`;

export const SectionsWrapper = styled.div`
  flex: 1;
  background-color: #fff;

  ${({ largeDevice }) =>
    largeDevice ? `padding-left: 40px;padding-top: 60px;border-left: 1px solid ${Grey5};` : ''};
`;
