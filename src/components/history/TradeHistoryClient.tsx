'use client';

import React, { useEffect, useState } from 'react';
import { 
  Flex, 
  Text, 
  Card, 
  StatusIndicator,
  Table,
  Heading,
  Icon,
  Background,
  Badge
} from '@/once-ui/components';
import styles from './TradeHistory.module.scss';

interface ClosedPosition {
  symbol: string;
  direction: string;
  volume: number;
  price: number;
  deal_id: string;
  open_timestamp: string;
  close_timestamp: string;
  mt5_mirrored: boolean;
}

interface TradeData {
  status: string;
  closed_positions: ClosedPosition[];
}

export default function TradeHistoryClient() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [tradeData, setTradeData] = useState<TradeData>({
    status: 'Connecting...',
    closed_positions: []
  });
  
  // Add theme detection
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  // Check for dark theme on mount and when theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkTheme(isDark);
    };
    
    // Check theme initially
    checkTheme();
    
    // Set up an observer to detect theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Connect to the WebSocket server
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8765');
      
      ws.onopen = () => {
        console.log('Connected to the trade monitor server');
        setConnected(true);
        ws.send(JSON.stringify({ command: 'get_data' }));
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setTradeData({
            status: data.status,
            closed_positions: data.closed_positions || []
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onclose = () => {
        console.log('Disconnected from the trade monitor server');
        setConnected(false);
        setSocket(null);
        
        // Try to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      setSocket(ws);
    };
    
    connectWebSocket();
    
    // Clean up on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const getDirectionColor = (direction: string): "green" | "red" => {
    return direction === 'BUY' ? "green" : "red";
  };

  const formatDateTime = (timestamp: string) => {
    if (!timestamp) return '';
    
    // Extract date and time parts from the timestamp format "YYYY-MM-DD HH:MM:SS.sss"
    const parts = timestamp.split(' ');
    if (parts.length !== 2) return timestamp;
    
    return parts[1].substring(0, 8); // Return just the HH:MM:SS part
  };

  // Render closed positions table
  const renderClosedPositionsTable = () => {
    // Convert our data to Table component format
    if (tradeData.closed_positions.length === 0) {
      return (
        <Flex 
          background="neutral-weak" 
          horizontal="center" 
          vertical="center" 
          padding="24" 
          radius="m"
          fillWidth
        >
          <Flex vertical="center" gap="8">
            <Icon name="info" size="m" onBackground="neutral-strong" />
            <Text variant="body-default-m" onBackground="neutral-strong">No closed positions</Text>
          </Flex>
        </Flex>
      );
    }

    const tableData = {
      headers: [
        { content: "Symbol", key: "symbol" },
        { content: "Direction", key: "direction" },
        { content: "Volume", key: "volume" },
        { content: "Price", key: "price" },
        { content: "Deal ID", key: "dealId" },
        { content: "Open Time", key: "openTime" },
        { content: "Close Time", key: "closeTime" },
        { content: "MT5", key: "mt5" }
      ],
      rows: tradeData.closed_positions.map(position => [
        <Text weight="strong">{position.symbol}</Text>,
        <Flex vertical="center" gap="8">
          <StatusIndicator size="s" color={getDirectionColor(position.direction)} />
          <Text variant="body-strong-s" onBackground={position.direction === 'BUY' ? "success-medium" : "danger-medium"}>
            {position.direction}
          </Text>
        </Flex>,
        position.volume,
        <Text variant="body-default-m">{position.price.toFixed(2)}</Text>,
        <Text variant="code-default-s">{position.deal_id}</Text>,
        <Text variant="body-default-s">{formatDateTime(position.open_timestamp)}</Text>,
        <Text variant="body-default-s">{formatDateTime(position.close_timestamp)}</Text>,
        <Badge color={position.mt5_mirrored ? "green" : "yellow"}>
          {position.mt5_mirrored ? 'Mirrored' : 'Not Mirrored'}
        </Badge>
      ])
    };

    // Wrap Table in a div with 100% width
    return (
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Table data={tableData} />
      </div>
    );
  };

  return (
    <div className={`${styles.centered} ${styles.pageContainer}`}>
      <Flex 
        className={`${isDarkTheme ? styles.darkMode : ''} ${styles.fullWidth}`} 
        direction="column" 
        gap="24" 
        fillWidth
      >
        <Card 
          padding="24" 
          radius="m" 
          border="neutral-medium" 
          className={styles.fullWidth}
        >
          <Flex 
            direction="column" 
            gap="24" 
            fillWidth
          >
            <Flex vertical="center" gap="8">
              <Icon name="book" size="m" onBackground="brand-medium" />
              <Heading as="h3" onBackground="brand-strong">Trade History</Heading>
            </Flex>
            <div 
              className={`${styles.fullWidth} ${styles.tableContainer} ${isDarkTheme ? styles.darkThemeTable : ''}`}
            >
              {renderClosedPositionsTable()}
            </div>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
} 