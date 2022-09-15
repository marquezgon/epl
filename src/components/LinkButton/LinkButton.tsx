import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import Button, { ButtonProps } from '@mui/material/Button';
import themeConfig from  '../../utils/themeConfig';

const LinkBehavior = React.forwardRef<
HTMLAnchorElement,
Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});
LinkBehavior.displayName = 'LinkBehavior';

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: themeConfig.palette,
});

function LinkButton(props: ButtonProps) {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>
  );
}

export default LinkButton;