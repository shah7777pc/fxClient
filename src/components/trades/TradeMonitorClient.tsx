'use client';

import React, { useEffect, useState } from 'react';
import { 
  Flex, 
  Text, 
  Grid, 
  Badge, 
  Card, 
  StatusIndicator,
  Row,
  Table,
  Background,
  Heading,
  Icon
} from '@/once-ui/components';
import styles from './TradeMonitor.module.scss';

interface OpenPosition {
  symbol: string;
  direction: string;
  status: string;
  volume: number;
  price: number;
  deal_id: string;
  timestamp: string;
  mt5_mirrored: boolean;
}

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

interface MT5Status {
  connected: boolean;
  balance: number;
}

interface TradeData {
  status: string;
  mt5_status: MT5Status;
  open_positions: OpenPosition[];
  closed_positions: ClosedPosition[];
}

export default function TradeMonitorClient() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [tradeData, setTradeData] = useState<TradeData>({
    status: 'Connecting...',
    mt5_status: { connected: false, balance: 0 },
    open_positions: [],
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
          setTradeData(data);
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

  const getStatusColor = (status: string): "green" | "yellow" | "blue" => {
    switch (status) {
      case 'Active': return "green";
      case 'Opening': return "yellow";
      default: return "blue";
    }
  };

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

  // Render system status card
  const renderStatusCard = () => {
    return (
      <Card
        background={connected ? "success-weak" : "neutral-weak"}
        border={connected ? "success-medium" : "neutral-medium"}
        padding="16"
        radius="m"
      >
        <Flex horizontal="space-between" vertical="center">
          <Flex vertical="center" gap="8">
            <StatusIndicator 
              size="m" 
              color={connected ? "green" : "gray"} 
            />
            <Text weight="strong" onBackground={connected ? "success-strong" : "neutral-strong"}>
              {connected ? 'Connected to Monitor' : 'Connecting...'}
            </Text>
          </Flex>
          
          <Flex vertical="center" gap="12">
            <Flex vertical="center" gap="8">
              <StatusIndicator 
                size="s" 
                color={tradeData.mt5_status.connected ? "green" : "red"} 
              />
              <Text variant="body-strong-s" onBackground={tradeData.mt5_status.connected ? "success-medium" : "danger-medium"}>
                MT5: {tradeData.mt5_status.connected ? 'Connected' : 'Disconnected'}
              </Text>
            </Flex>
            
            {tradeData.mt5_status.connected && (
              <Badge color="green">
                <Flex vertical="center" gap="4">
                  <Icon name="wallet" size="s" />
                  <Text variant="body-strong-s">${tradeData.mt5_status.balance.toFixed(2)}</Text>
                </Flex>
              </Badge>
            )}
          </Flex>
        </Flex>
      </Card>
    );
  };

  // Render open positions table
  const renderOpenPositionsTable = () => {
    // Convert our data to Table component format
    if (tradeData.open_positions.length === 0) {
      return (
        <Flex 
          background="neutral-weak" 
          horizontal="center" 
          vertical="center" 
          padding="24" 
          radius="m"
        >
          <Flex vertical="center" gap="8">
            <Icon name="info" size="m" onBackground="neutral-strong" />
            <Text variant="body-default-m" onBackground="neutral-strong">No open positions</Text>
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
        { content: "Status", key: "status" },
        { content: "Deal ID", key: "dealId" },
        { content: "Time", key: "time" },
        { content: "MT5", key: "mt5" }
      ],
      rows: tradeData.open_positions.map(position => [
        <Text weight="strong">{position.symbol}</Text>,
        <Flex vertical="center" gap="8">
          <StatusIndicator size="s" color={getDirectionColor(position.direction)} />
          <Text variant="body-strong-s" onBackground={position.direction === 'BUY' ? "success-medium" : "danger-medium"}>
            {position.direction}
          </Text>
        </Flex>,
        position.volume,
        <Text variant="body-default-m">{position.price.toFixed(2)}</Text>,
        <Badge color={getStatusColor(position.status)}>
          {position.status}
        </Badge>,
        <Text variant="code-default-s">{position.deal_id}</Text>,
        <Text variant="body-default-s">{formatDateTime(position.timestamp)}</Text>,
        <Badge color={position.mt5_mirrored ? "green" : "yellow"}>
          {position.mt5_mirrored ? 'Mirrored' : 'Not Mirrored'}
        </Badge>
      ])
    };

    return (
      <div className={isDarkTheme ? styles.darkThemeTable : ''}>
        <Table data={tableData} />
      </div>
    );
  };

  // Render trading summary
  const renderSummary = () => {
    return (
      <Grid columns={3} gap="16">
        <Card padding="16" radius="m" border="neutral-medium">
          <Flex direction="column" gap="8">
            <Text variant="body-default-s" onBackground="neutral-medium">Open Positions</Text>
            <Text variant="heading-default-l">{tradeData.open_positions.length}</Text>
          </Flex>
        </Card>
        
        <Card padding="16" radius="m" border="neutral-medium">
          <Flex direction="column" gap="8">
            <Text variant="body-default-s" onBackground="neutral-medium">Recent Trades</Text>
            <Text variant="heading-default-l">{tradeData.closed_positions.length}</Text>
          </Flex>
        </Card>
        
        <Card padding="16" radius="m" border="neutral-medium">
          <Flex direction="column" gap="8">
            <Text variant="body-default-s" onBackground="neutral-medium">MT5 Balance</Text>
            <Text variant="heading-default-l">
              ${tradeData.mt5_status.connected ? tradeData.mt5_status.balance.toFixed(2) : "0.00"}
            </Text>
          </Flex>
        </Card>
      </Grid>
    );
  };

  return (
    <div className={styles.centered}>
      <Flex className={`${styles.tradeMonitor} ${isDarkTheme ? styles.darkMode : ''}`} direction="column" gap="24" fillWidth>
        {renderStatusCard()}
        
        {renderSummary()}
        
        <Grid columns={1} gap="24">
          <Card padding="24" radius="m" border="neutral-medium">
            <Flex direction="column" gap="24">
              <Flex vertical="center" gap="8">
                <Icon name="grid" size="m" onBackground="brand-medium" />
                <Heading as="h3" onBackground="brand-strong">Active Positions</Heading>
              </Flex>
              {renderOpenPositionsTable()}
            </Flex>
          </Card>
        </Grid>
      </Flex>
    </div>
  );
} 