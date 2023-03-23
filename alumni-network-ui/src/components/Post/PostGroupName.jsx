import React, { useState, useEffect } from 'react';
import { getGroupById } from "../../api/group";

function PostGroupName({ groupId }) {
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    async function fetchGroup() {
      const name = await fetchGroupName(groupId);
      setGroupName(name);
    }
    fetchGroup();
  }, [groupId]);

  async function fetchGroupName(groupId) {
    const [groupData] = await getGroupById(groupId);
    return groupData.name;
  }

  return (
    <div>
      <span>r/{groupName.toLowerCase() || <i>Loading...</i>}</span>
    </div>
  );
}
export default PostGroupName;