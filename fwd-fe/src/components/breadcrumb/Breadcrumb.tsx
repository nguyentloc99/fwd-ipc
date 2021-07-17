import React, { FC, ReactElement, useMemo } from 'react';
import { Link, matchPath } from 'react-router-dom';

import classes from './breadcrumb.module.scss';

type SingleRoute = {
  path: string;
  name: string;
  children?: SingleRoute[];
};

export type Routes = Array<SingleRoute>;

interface Props {
  routes: Routes;
  itemRender?: (
    route: string,
    index: number,
    flatRoute: FlatRoute,
  ) => ReactElement;
  currentPath: string;
}

export type FlatRoute = { path: string[]; name: string[] };

const flatRoute = (
  routes: Routes,
  prePath: string[] = [],
  preName: string[] = [],
): FlatRoute[] => {
  return routes.reduce<FlatRoute[]>((acc, item) => {
    if (item.children) {
      return [
        ...flatRoute(
          item.children,
          [...prePath, item.path],
          [...preName, item.name],
        ),
        {
          path: [...prePath, item.path],
          name: [...preName, item.name],
        },
        ...acc,
      ];
    }
    return [
      { path: [...prePath, item.path], name: [...preName, item.name] },
      ...acc,
    ];
  }, []);
};

const Breadcrumb: FC<Props> = ({ routes, currentPath, itemRender }) => {
  const flattedRoute = useMemo(() => {
    return flatRoute(routes);
  }, [routes]);
  const match = useMemo(() => {
    let matchIndex = -1;
    const matchRoute = flattedRoute.find((route) =>
      route.path.find((path, index) => {
        const result = matchPath(currentPath, {
          path,
          exact: true,
        });
        if (result) {
          matchIndex = index;
        }
        return result;
      }),
    );
    if (!matchRoute || matchIndex < 0) {
      return {
        name: [],
        path: [],
      };
    }
    const matchResult = {
      name: matchRoute.name.slice(0, matchIndex + 1),
      path: matchRoute.path.slice(0, matchIndex + 1),
    };
    matchResult.name.forEach((name, i, arr) => {
      if (!name) {
        arr.splice(i, 1);
        matchResult.path.splice(i, 1);
      }
    });
    matchResult.path.forEach((path, i, arr) => {
      if (!path && i > 0) {
        let altPath = '';
        for (let j = i - 1; j >= 0; j--) {
          if (arr[j]) {
            altPath = arr[j];
            break;
          }
        }
        // eslint-disable-next-line no-param-reassign
        arr[i] = altPath;
      }
    });
    return matchResult;
  }, [currentPath, flattedRoute]);
  const defaultRender = (i: string, index: number) => {
    if (!match) {
      return null;
    }
    const currentLink = match.path[index];
    return (
      <React.Fragment key={String(index)}>
        <Link to={currentLink} className={classes.link}>
          {i}
        </Link>
        {index !== match.name.length - 1 && <span>{' > '}</span>}
      </React.Fragment>
    );
  };
  return (
    <div className={classes.breadcrumb}>
      {match
        ? match.name.map(
            itemRender
              ? (i, index) => itemRender(i, index, match)
              : defaultRender,
          )
        : null}
    </div>
  );
};

export default Breadcrumb;
