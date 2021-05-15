# Custom Hooks
```javascript

const useUserTeam = (userCode?: string) => {
  const [userTeams, setUserTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (!userCode) return;
    getUserTeams({ userCode }).then((team) => {
      setUserTeams(team);
    });
  }, [userCode]);

  return {
    userTeams,
  };
};

export default useUserTeam;
```