import { Flex } from "@/once-ui/components";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="center"
        vertical="center"
      >
        {/* Footer content removed */}
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};
