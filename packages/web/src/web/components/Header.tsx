import { Box, Button, Flex, Spacer, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FiGithub } from 'react-icons/fi';

import Logo from '../../../public/logo.svg';
import {
  useAutoConnectWallet,
  useGetCommitmentPeriodIsUpcoming,
  useGetCommitmentPeriodIsValid,
  useHasTokenId,
  useStatusAndChainUnsupported
} from '../hooks';

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false }, 'sm');
  const buttonSize = isMobile ? 'md' : 'lg';

  const router = useRouter();

  const statusAndChainUnsupported = useStatusAndChainUnsupported();
  const commitmentPeriodIsValid = useGetCommitmentPeriodIsValid();
  const commitmentPeriodIsUpcoming = useGetCommitmentPeriodIsUpcoming();
  const hasTokenId = useHasTokenId();

  const walletAutoConnect = useAutoConnectWallet(false);

  const verbiage =
    statusAndChainUnsupported.status !== 'connected' || statusAndChainUnsupported.connectionRejected
      ? 'connect'
      : hasTokenId
      ? 'token'
      : commitmentPeriodIsValid || commitmentPeriodIsUpcoming
      ? 'mint'
      : 'request';

  return (
    <Flex height="70px" position="absolute" left={0} top={0} right={0} px={4} shadow="sm">
      <Flex mx="auto" align="center" width="100%" maxWidth={1200}>
        <Box cursor="pointer">
          <Link href="/" passHref>
            <Flex align="center">
              <Image src={Logo} alt="Proof of residency logo" width={48} height={48} />
            </Flex>
          </Link>
        </Box>

        <Spacer />

        <Tooltip
          label={
            !statusAndChainUnsupported.noProvider ? undefined : 'Install Metamask to use this app'
          }
          shouldWrapChildren
        >
          <Button
            onClick={async () => {
              if (verbiage === 'connect') {
                await walletAutoConnect();
              } else if (verbiage === 'mint') {
                await router.push('/mint');
              } else if (verbiage === 'token') {
                await router.push(`/token/${hasTokenId}`);
              } else if (verbiage === 'request') {
                await router.push(`/request`);
              }
            }}
            disabled={statusAndChainUnsupported.noProvider}
            size={buttonSize}
          >
            {verbiage}
          </Button>
        </Tooltip>
        <Link href="/explore" passHref>
          <Button ml={3} variant="outline" size={buttonSize}>
            explore
          </Button>
        </Link>
        <Link href="/faq" passHref>
          <Button ml={3} variant="outline" size={buttonSize}>
            faq
          </Button>
        </Link>

        {!isMobile && (
          <Link href="https://github.com/proof-of-residency" passHref>
            <Button ml={3} variant="outline" size={buttonSize}>
              <FiGithub size={25} />
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
