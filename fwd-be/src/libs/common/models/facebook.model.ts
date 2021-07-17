export interface FacebookModel {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  email?: string;
  about?: string;
  picture?: {
    data: {
      url: string;
    }
  };
}

export interface FacebookAppFriends {
  context: {
    friends_using_app: {
      data: [
        {
          id: string;
        }
        ],
      paging: {
        cursors: {
          after: string;
        }
      },
      summary: {
        total_count: number;
      }
    },
    id: string;
  };
}
