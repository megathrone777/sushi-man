import { css } from "~/theme";

const notification = css`
  .reapop {
    &__container {
      bottom: ${({ theme }) => theme.rem(20)};
      position: fixed;
      right: ${({ theme }) => theme.rem(20)};
      z-index: 999999;
    }

    &__notification {
      align-items: center;

      border-radius: ${({ theme }) => theme.rem(2)};
      box-shadow: 0 ${({ theme }) => theme.rem(3)}
        ${({ theme }) => theme.rem(6)} 0 rgba(0, 0, 0, 0.16);
      display: flex;
      justify-content: space-between;
      margin-bottom: ${({ theme }) => theme.rem(20)};
      padding: ${({ theme }) => theme.rem(20)} ${({ theme }) => theme.rem(30)};
      width: ${({ theme }) => theme.rem(460)};

      &--success {
        background-color: green;
      }

      &--error {
        background-color: red;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: ${({ theme }) => theme.rem(300)};
      }

      &-title {
        color: white;
        font-size: ${({ theme }) => theme.rem(18)};
        text-shadow: 0 0 ${({ theme }) => theme.rem(1)} rgba(0, 0, 0, 0.16);
        text-transform: lowercase;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
          font-size: ${({ theme }) => theme.rem(16)};
        }
      }

      &-meta {
        flex-grow: 1;
      }

      &-dismiss-icon {
        color: white;
        height: ${({ theme }) => theme.rem(15)};
        margin-right: ${({ theme }) => theme.rem(15)};
        width: ${({ theme }) => theme.rem(15)};

        &:last-of-type {
          cursor: pointer;
          margin-right: 0;
        }
      }
    }
  }
`;

export { notification };