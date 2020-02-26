import React, { Fragment } from "react";
import cx from "clsx";
import {
  CssBaseline,
  Paper,
  Toolbar,
  makeStyles,
  Container,
  Grid
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Root,
  Header,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  SidebarTrigger,
  CollapseIcon,
  SidebarTriggerIcon,
  fixedLayoutPreset
} from "@mui-treasury/layout";

import {
  ListRootDrawerItems,
  ListAdminDrawerItems,
  ListClientDrawerItems
} from "components/drawer/drawerItems";

// import Content from "components/drawer/content";
import NavBar from "components/drawer/navBar";
import NavHeader from "components/drawer/navHeaderProfile";
import { TextSidebar } from "@mui-treasury/mockup/sidebars";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.08)"
  },
  appBarSpacer: theme.mixins.toolbar,
  collapseBtn: {
    color: "#fff",
    minWidth: 0,
    width: 40,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(0,0,0,0.24)",
    margin: "0 auto 16px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.38)"
    }
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  sidebar: {
    backgroundColor: "#4065E0",
    border: "none"
  },
  content: {
    backgroundColor: "#f9f9f9"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const config = {
  autoCollapseDisabled: false,
  collapsedBreakpoint: "sm",
  heightAdjustmentDisabled: false,
  xs: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "persistent",
      width: 220,
      collapsible: true,
      collapsedWidth: 64
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 56,
      persistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit"
    }
  },
  sm: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "temporary",
      width: 256,
      collapsible: true,
      collapsedWidth: 64
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 64,
      persistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit"
    }
  },
  md: {
    sidebar: {
      anchor: "left",
      hidden: false,
      inset: false,
      variant: "permanent",
      width: 256,
      collapsible: true,
      collapsedWidth: 64
    },
    header: {
      position: "sticky",
      clipped: true,
      offsetHeight: 64,
      persistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit"
    }
  }
};

const App = ({ children, user }) => {
  const userData = user || {};
  const role = userData.role;
  const companyName = userData.companyName;
  let drawerList;
  const styles = useStyles();

  switch (role) {
    case "root":
      drawerList = <ListRootDrawerItems />;
      break;
    case "admin":
      drawerList = <ListAdminDrawerItems />;
      break;
    case "client":
      drawerList = <ListClientDrawerItems />;
      break;
    default:
      break;
  }

  return (
    <Root config={config}>
      {({ headerStyles, sidebarStyles, collapsed }) => (
        <Fragment>
          <CssBaseline />
          <Header className={styles.header}>
            <Toolbar>
              <SidebarTrigger className={headerStyles.leftTrigger}>
                <SidebarTriggerIcon />
              </SidebarTrigger>
              <NavBar companyName={companyName} />
            </Toolbar>
          </Header>

          {/* DRAWER */}

          <Sidebar PaperProps={{ classes: { root: styles.sidebar } }}>
            {/* PROFILE */}
            <NavHeader collapsed={collapsed} userData={userData} />

            {/* DRAWER LIST */}
            <div className={sidebarStyles.container}>
              {drawerList}
              {/* <TextSidebar /> */}
            </div>
            <CollapseBtn
              className={cx(sidebarStyles.collapseBtn, styles.collapseBtn)}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </CollapseBtn>
          </Sidebar>

          {/* Main content in the page */}

          <Content>
            <main className={styles.content}>
              <div className={styles.appBarSpacer} />
              <Container maxWidth="lg" className={styles.container}>
                <Grid container>
                  <Grid item>
                    <Paper className={styles.paper}>{children}</Paper>
                  </Grid>
                </Grid>
              </Container>
            </main>
          </Content>
        </Fragment>
      )}
    </Root>
  );
};

export default App;
