import React from 'react';
import PropTypes from 'prop-types';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import {
  HeadingXXLarge, ParagraphLarge, ParagraphSmall, ParagraphXSmall,
} from 'baseui/typography';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import { useRouter } from 'next/router';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import Image from 'next/image';
import { ButtonGroup, MODE } from 'baseui/button-group';
import { Block } from 'baseui/block';
import Loading from '../../components/atoms/loading';

export default function SignIn({ csrfToken }) {
  const [css] = useStyletron();
  const router = useRouter();

  const [selected, setSelected] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loginErrVisible, setLoginErrVisible] = React.useState(false);

  function clearErrors() {
    setLoading(false);
    setEmailError('');
    setPasswordError('');
    setLoginErrVisible(false);
  }

  function onEmailChange(e) {
    clearErrors();
    setEmail(e.currentTarget.value);
  }

  function onPasswordChange(e) {
    clearErrors();
    setPassword(e.currentTarget.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      signIn('credentials', { email, password, redirect: false })
        .then((res) => {
          if (!res.error) {
            router.push('/');
          } else {
            setLoading(false);
            setLoginErrVisible(true);
          }
        });
    } else {
      setEmailError('This field cannot be empty');
      setPasswordError('This field cannot be empty');
    }
  }

  return (
    <main className={css({
      maxWidth: '1440px',
      margin: '0 auto',
      minHeight: '100vh',
      height: '100%',
    })}
    >
      <Loading loading={loading} />
      <FlexGrid flexGridColumnCount={[1, 1, 1, 2]}>
        <FlexGridItem
          height="100%"
          minHeight="100vh"
          backgroundColor="primary"
          paddingTop={['20px', '20px', '40px', '120px']}
          paddingRight={['20px', '20px', '40px', '100px']}
          paddingBottom={['20px', '20px', '40px', '120px']}
          paddingLeft={['20px', '20px', '40px', '100px']}
          display="flex"
          alignItems="center"
        >
          <Block paddingBottom={['0px', '0px', '0px', '60px']}>
            <Block>
              <Image src="/logo-light.svg" width="300px" height="130px" objectFit="contain" />
            </Block>
            <Block>
              <ParagraphLarge color="accent">
                Seamlessly organize and track all your class attendances
                using Synk&apos;s excellent library and facial recognition
                technology.
              </ParagraphLarge>
              <ParagraphSmall color="mono100">
                Speak with your organization to register you and your team.
              </ParagraphSmall>
            </Block>
          </Block>
          <Block position="absolute" bottom="4rem">
            <ParagraphSmall color="mono500">Sign In Options</ParagraphSmall>
            <ButtonGroup
              size={SIZE.mini}
              mode={MODE.radio}
              selected={selected}
              onClick={(event, index) => setSelected(index)}
            >
              <Button overrides={{
                BaseButton: {
                  style: ({ $isSelected, $theme }) => ({
                    backgroundColor: $isSelected ? $theme.colors.accent : 'transparent',
                    color: $isSelected ? $theme.colors.mono100 : $theme.colors.mono400,
                    ':hover': { color: $isSelected ? $theme.colors.mono100 : $theme.colors.mono1000 },
                  }),
                },
              }}
              >
                Admin
              </Button>
              <Button overrides={{
                BaseButton: {
                  style: ({ $isSelected, $theme }) => ({
                    backgroundColor: $isSelected ? $theme.colors.accent : 'transparent',
                    color: $isSelected ? $theme.colors.mono100 : $theme.colors.mono400,
                    ':hover': { color: $isSelected ? $theme.colors.mono100 : $theme.colors.mono1000 },
                  }),
                },
              }}
              >
                Teacher/Student
              </Button>
            </ButtonGroup>
          </Block>
        </FlexGridItem>
        <FlexGridItem
          backgroundColor="mono200"
          minHeight="100vh"
          width="100%"
          height="100%"
          paddingRight={['20px', '20px', '40px', '100px']}
          paddingLeft={['20px', '20px', '40px', '100px']}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Block maxWidth="400px" width="100%">
            <ParagraphXSmall margin={0}>{selected === 0 ? 'Admin' : 'Teacher/Student'}</ParagraphXSmall>
            <HeadingXXLarge $style={{ fontWeight: 'bold' }} marginTop={0} marginBottom="2.5rem">
              Sign In
            </HeadingXXLarge>
            <form
              onSubmit={handleSubmit}
              method="post"
              action="/api/auth/callback/credentials"
              style={{ maxWidth: '400px', width: '100%' }}
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <FormControl error={emailError}>
                <Input
                  placeholder="Email"
                  value={email}
                  type="email"
                  id="email"
                  error={emailError}
                  onChange={(e) => onEmailChange(e)}
                />
              </FormControl>
              <Block height="0.6rem" />
              <FormControl error={passwordError}>
                <Input
                  error={passwordError}
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={(e) => onPasswordChange(e)}
                />
              </FormControl>
              <Block height={loginErrVisible ? '0.6rem' : '2rem'} />
              <Block display={loginErrVisible ? 'grid' : 'none'}>
                <ParagraphSmall color="negative" $style={{ textAlign: 'center', fontStyle: 'italic' }}>
                  Invalid email or password.
                </ParagraphSmall>
                <Block height="0.6rem" />
              </Block>

              <Button
                type="submit"
                overrides={{
                  Root: {
                    style: ({ $theme }) => ({
                      width: '100%',
                      backgroundColor: $theme.colors.accent,
                    }),
                  },
                }}
              >
                Sign In
              </Button>
            </form>
          </Block>
        </FlexGridItem>
      </FlexGrid>
    </main>
  );
}

SignIn.propTypes = {
  csrfToken: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        source: '/auth/signin',
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { csrfToken: await getCsrfToken(context), session } };
}
