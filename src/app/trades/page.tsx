'use client';

import React from 'react';
import { Card, Text, Heading, Grid, Flex, Background } from '@/once-ui/components';
import TradeMonitorClient from '@/components/trades/TradeMonitorClient';

export default function TradesPage() {
  return (
    <Background>
      <Flex direction="column" gap="32" padding="32">
        <Flex direction="column" gap="8">
          <Heading as="h1"></Heading>
          <Text onBackground="neutral-medium"></Text>
        </Flex>
        
        <TradeMonitorClient />
      </Flex>
    </Background>
  );
} 