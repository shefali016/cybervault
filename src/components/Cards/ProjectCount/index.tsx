import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import { Title, CountText } from "./style";
const ProjectCount = (props: {
  projectCount?: any,
  openProject?: any,
}): JSX.Element => (
    <Button onClick={props.openProject} style={{ marginLeft: 10, padding: 0 }}>
      <Card style={{ width: '10rem', height: '10rem' }}>
        <CardContent>
          <Title>
            Projects This Month
          </Title>
          <CountText>{props.projectCount ? props.projectCount : 0}</CountText>
        </CardContent>
      </Card>
    </Button>)


export default ProjectCount;