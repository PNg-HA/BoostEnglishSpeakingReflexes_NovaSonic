import { useState, useRef } from "react";
import * as React from "react";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { AppLayout, SideNavigation } from '@cloudscape-design/components';
import TopNavigation from "@cloudscape-design/components/top-navigation";
import S2sChatBot from './s2s'

const ITEMS = [
  {
    type: "link",
    text: "Chat",
    id:"s2s",
    href:"#/s2s",
  }
]


const App = ({ signOut, user }) => {
  const [currentPage, setCurrentPage] = useState("s2s");
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [activeNavHref, setActiveNavHref] = useState("#/s2s");
  const [displayTopMenu] = useState(window.self === window.top);

  const appLayout = useRef();

  const handleNavigationChange = () => {
    setNavigationOpen(!navigationOpen);
  }

  const handleNavItemClick = e => {
    if (e.detail.id === "logout") {
      signOut();
      return;
    }
    setCurrentPage(e.detail.id);

    setActiveNavHref("#/"+e.detail.id);
  }

  const handleTopClick = e => {
    setCurrentPage("file");
    setActiveNavHref("#/file")
    setNavigationOpen(true);
  }

    return (
      <div>
        {displayTopMenu &&
          <TopNavigation      
            identity={{
              href: "#",
              title: "Amazon Nova S2S Sample Client App",
              onFollow: handleTopClick   
            }}
            i18nStrings={{
              searchIconAriaLabel: "Search",
              searchDismissIconAriaLabel: "Close search",
              overflowMenuTriggerText: "More",
              overflowMenuTitleText: "All",
              overflowMenuBackIconAriaLabel: "Back",
              overflowMenuDismissIconAriaLabel: "Close menu"
            }}
          />}
        <AppLayout
          headerSelector="#header"
          ref={appLayout}
          contentType="table"
          navigationOpen={navigationOpen}
          onNavigationChange={handleNavigationChange}
          navigation={
            <SideNavigation items={ITEMS} header={["s2s"]} activeHref={activeNavHref} onFollow={handleNavItemClick} />
            }
          navigationWidth={0}
          content={
            currentPage === "s2s"?<S2sChatBot />:
            <div/>
          }
        >
        </AppLayout>
      </div>
  );
}
export default App;
