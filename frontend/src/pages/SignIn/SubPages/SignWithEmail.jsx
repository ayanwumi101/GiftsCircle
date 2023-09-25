import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button, Spinner
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/event-circle.svg';
import { EmailSignIn } from '../../../redux/features/auth/services';
import { dispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import AlertBox from '../../../components/Alert';
import { SignInApi } from '../../../redux/axios/apis/auth';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';

const SignInWithEmail = () => {
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTest, setEmailTest] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const EmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (EmailRegex.test(email)) {
      setEmailTest(true);
    } else {
      setEmailTest(false);
    }
  }, [email]);

  const HandleSubmit = async () => {
    if (emailTest) {
      const formBody = { email, password };
      setLoading(true);
      try {
        const res = await SignInApi(formBody);
        dispatch(EmailSignIn(res.data));
        await setLoading(false)
      } catch (error) {
        setError(ErrorHandler(error));
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      HandleSubmit();
    }
  }

  return (
    <Box>
    <Flex
      bgColor="#fff"
      color="#000000"
      h={error ? "670px":"628px"}
      direction="column"
      gap="30px"
      zIndex="99"
      // w={['80%', '100%']}
      mx='auto'
      mt={['50px', 0]}
    >
      <Box bgColor="#0F172A" h="104.25px" p="30px 60px">
        <Flex justifyContent="center">
          <Box>
            <img src={Logo} alt="logo" />
          </Box>
        </Flex>
      </Box>

      <Box mx={[0, 14]} p={[5, 0]}>
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width={['320px', '430px']}>
            <Text
              fontSize="30px"
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Sign in
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              Let's get you logged in to get back to adding gift list to your
              event page.
            </Text>
          </Flex>
  
            <Flex direction="column" gap="20px">
              {error && <AlertBox message={error.message} setError={setError} />}
              <FormControl gap="6px">
                <FormLabel
                  fontSize="14px"
                  color="#12141D"
                  lineHeight="22px"
                  fontWeight="500"
                >
                  Enter email address
                </FormLabel>
                <Input
                  borderRadius="10px"
                  bgColor={
                    email === ''
                      ? '#F4F4F4'
                      : emailTest
                        ? '#F4F4F4'
                        : 'rgba(255, 77, 79, 0.1)'
                  }
                  border={
                    email === ''
                      ? 'none'
                      : emailTest
                        ? '1px solid #389E0D'
                        : '1px solid #FF4D4F'
                  }
                  h="46px"
                  p="12px"
                  gap="10px"
                  type="email"
                  name="email"
                  fontSize="14px"
                  lineHeight="22px"
                  fontWeight="400"
                  color="#A8A8A8"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g dayo.abdullahi@gmail.com"
                  _placeholder={{
                    color: '#A8A8A8',
                    opacity: 0.4,
                    fontSize: '14px',
                  }}
                />
                {email !== '' && !emailTest && (
                  <FormHelperText
                    fontSize="14px"
                    lineHeight="22px"
                    fontWeight="500"
                    color="#FF4D4F"
                  >
                    Not a valid Email
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl gap="6px">
                <FormLabel
                  fontSize="14px"
                  color="#12141D"
                  lineHeight="22px"
                  fontWeight="500"
                >
                  Enter your password
                </FormLabel>
                <InputGroup h="46px" bgColor="#F4F4F4" borderRadius="10px">
                  <Input
                    borderRadius="10px"
                    h="46px"
                    gap="10px"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    fontSize="14px"
                    p="12px"
                    lineHeight="22px"
                    fontWeight="400"
                    placeholder="****************"
                    _placeholder={{
                      color: '#A8A8A8',
                      opacity: 0.4,
                      fontSize: '14px',
                    }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <InputRightElement
                    cursor="pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <FiEyeOff /> : <FiEye />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>

          <Flex justifyContent="right">
            <Text
              fontSize="14px"
              color="#0C4C84"
              lineHeight="22px"
              fontWeight="600"
            >
              <Link to="/forgot_password">Forgot password?</Link>
            </Text>
          </Flex>

          <Button
            bgColor="#55D4CC"
            opacity={emailTest ? '1.0' : '0.5'}
            borderRadius="5px"
            gap="10px"
            h="50px"
            p="14px 28px"
            fontSize="14px"
            color="#FFFFFF"
            lineHeight="22px"
            fontWeight="500"
            _hover={{ bgColor: '55D4CC' }}
            disabled={!emailTest}
            onClick={() => HandleSubmit()}
          >
            {loading ? <Spinner size='md' /> : 'Login'}
          </Button>

          <Flex justifyContent="center">
            <Flex justifyContent="center" alignItems="center" gap="10px">
              <Text
                color="#383838"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="500"
              >
                Don’t have an account?{' '}
                <Link to="/signup" style={{ color: '#0C4C84' }}>
                  Sign up here
                </Link>
              </Text>
              <HiOutlineArrowNarrowRight />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
    </Box>
  );
};

export default SignInWithEmail;
