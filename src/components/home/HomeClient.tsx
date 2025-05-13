'use client';

import React from "react";

import { Heading, Flex, Text, Button, RevealFx, Column, Badge, Row, Background } from "@/once-ui/components";

import { baseURL } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import { Schema } from "@/once-ui/modules";
import TradeHistoryClient from "@/components/history/TradeHistoryClient";
import styles from "@/components/history/TradeHistory.module.scss";

export default function HomeClient() {
  return (
    <Column gap="xl" horizontal="center" className={styles.pageContainer} fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Trade History Section */}
      <Background fillWidth className={styles.pageContainer}>
        <Flex direction="column" gap="32" padding="32" fillWidth className={styles.fullWidth}>
          <Flex direction="column" gap="8">
            <Heading as="h1">Trade History</Heading>
            <Text onBackground="neutral-medium">View your completed trades and transaction history</Text>
          </Flex>
          
          <TradeHistoryClient />
        </Flex>
      </Background>

      {/* Original Home Content */}
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured && (
          <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
            <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
              href={home.featured.href}>
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.label}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
    </Column>
  );
} 