import React, { Fragment, useEffect } from 'react';
import Headroom from 'react-headroom';
import { Flex, Image } from 'rebass';
import styled from '@emotion/styled';
import { SectionLinks } from 'react-scroll-section';
import Fade from 'react-reveal/Fade';
import RouteLink from './RouteLink';
import Logo from '../static/gatsby-icon.png';
import { navigate } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby'
function getCssConfig() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            myCssSrc
            myFontFamily
          }
        }
      }
    `,
  );
  return site
}
const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
const getName = name => {
  const list = {
    'about': '关于',
    'projects': '项目'
  }
  return list[name]
}

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`;

const formatLinks = allLinks =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === 'home';
      return isHome
        ? {
          ...acc,
          home: value,
        }
        : {
          ...acc,
          links: [...acc.links, { name: getName(key), value }],
        };
    },
    { links: [], home: null },
  );

const Header = ({ currentPath }) => {
  let { siteMetadata: { myCssSrc, myFontFamily } } = getCssConfig() || { siteMetadata: {} }
  useEffect(() => {
    myCssSrc && linkCss(myCssSrc)
  })

  function linkCss(src) {
    let link = document.createElement('link')
    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = src
    document.querySelector('head').appendChild(link)
  }


  return (
    <HeaderContainer>
      <Fade top>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <SectionLinks>
            {({ allLinks }) => {
              const { home, links } = formatLinks(allLinks);

              const homeLink = home ? (
                <div
                  src={Logo}
                  width="50px"
                  alt="Portfolio Logo"
                  onClick={home.onClick}
                  style={{
                    cursor: 'pointer',
                    // color: '#7c37ad',
                    color: '#ffffff',
                    fontFamily: myFontFamily,
                    fontSize: '5vw'
                  }}
                >
                  <span>疏旺</span>
                </div>
              ) : null

              const peopleLink = (
                <RouteLink
                  key="博客"
                  onClick={() => navigate('https://shuwan9.surge.sh')}
                  selected={currentPath == '/people'}
                >
                  {'博客'}
                </RouteLink>
              );

              let navLinks = links.map(({ name, value }) => (
                <RouteLink
                  key={name}
                  onClick={value.onClick}
                  selected={value.selected}
                >
                  {name}
                </RouteLink>
              ));
              return (
                <Fragment>
                  {homeLink}
                  <Flex mr={[0, 3, 5]}>
                    <Flex>{navLinks}</Flex>
                    {/* Other links*/}
                    {peopleLink}
                    <Flex></Flex>
                  </Flex>
                </Fragment>
              );
            }}
          </SectionLinks>
        </Flex>
      </Fade>
    </HeaderContainer>
  )
};

export default Header;
