import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material';
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  title: string;
  footer?: string | JSX.Element;
  children: JSX.Element;
  fetchCount: () => void;
};

const AparentCard: React.FC<Props> = ({ title, children, footer, fetchCount }) => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{ 
        padding: 0, 
        border: `1px solid ${borderColor}`, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%' 
      }}
      elevation={9}
      variant="outlined"
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <CardHeader title={title} />
          <Button variant="contained" sx={{marginRight:'1rem'}} onClick={fetchCount}>
            <span>Fetch</span>
            <ArrowForwardIosIcon sx={{ paddingLeft: "0.1rem", fontSize: "small" }} />
          </Button>
        </Box>
        <Divider />
        <CardContent>{children}</CardContent>
      </Box>
      {footer && (
        <Box p={3}>
          <Divider />
          <Box mt={2}>{footer}</Box>
        </Box>
      )}
    </Card>
  );
};

export default AparentCard;
