import { keyframes, styled } from 'styled-components'

function Skeleton() {
  return (
    <SkeletonList>
      <SkeletonAvatar />
      <SkeletonLineWrap>
        <SkeletonLine width={70} />
        <SkeletonLine width={100} />
      </SkeletonLineWrap>
    </SkeletonList>
  )
}

export default Skeleton

const loadingAnimation = keyframes`
    100% {
        background-position: -100% 0;
    }
`

export const Shining = styled.span`
  background: linear-gradient(
      120deg,
      #2c2c2c 30%,
      #3a3a3a 38%,
      #3a3a3a 40%,
      #2c2c2c 48%
    )
    100% 0 / 200% 100%;
  animation: ${loadingAnimation} 1s infinite;
`

const SkeletonAvatar = styled(Shining)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-block;
  min-width: 32px;
  min-height: 32px;
`

const SkeletonLineWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SkeletonLine = styled(Shining)<{ width: number }>`
  height: 1.5rem;
  border-radius: 0.3rem;
  display: inline-block;
  width: ${(props) => props.width + '%'};
`

const SkeletonList = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 0;
`
