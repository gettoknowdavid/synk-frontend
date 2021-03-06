/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { HeadingMedium, ParagraphMedium, ParagraphSmall } from 'baseui/typography';
import PropTypes from 'prop-types';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

function StudentAttendance({ student }) {
  const [css, theme] = useStyletron();

  const { courses } = student.attributes;

  const TABLE_DATA = courses.data.map((course, index) => {
    const { title, code, attendances } = course.attributes;

    const classes = attendances.data.length;

    const present = attendances.data.map((st) => {
      const { content } = st.attributes;
      return content.filter((c) => c.id === student.id && c.status === true).length;
    }).reduce((p, c) => p + c, 0);

    const absent = attendances.data.map((st) => {
      const { content } = st.attributes;
      return content.filter((c) => c.id === student.id && c.status === false).length;
    }).reduce((p, c) => p + c, 0);

    const presentValue = parseInt(present, 10);
    const classesValue = parseInt(classes, 10);
    const percent = ((presentValue / classesValue) * 100);

    return {
      sn: index + 1,
      course: title,
      courseCode: code,
      present: present || 0,
      absent: absent || 0,
      percentage: percent || 0,
    };
  });

  return (
    <Block
      paddingLeft={['20px', '20px', '40px', '40px']}
      paddingRight={['20px', '20px', '40px', '40px']}
    >
      <HeadingMedium marginBottom={0}>Attendance Report</HeadingMedium>
      <Block marginTop="20px">
        <TableBuilder data={TABLE_DATA}>
          <TableBuilderColumn header="#">
            {(row) => <ParagraphSmall maxWidth="30px">{row.sn}</ParagraphSmall>}
          </TableBuilderColumn>
          <TableBuilderColumn header="COURSE">
            {(row) => (
              <Block>
                <ParagraphMedium margin={0} className={css({ fontWeight: '600' })}>
                  {row.course}
                </ParagraphMedium>
                <p style={{ margin: 0, letterSpacing: '1px', color: theme.colors.mono700 }}>
                  {row.courseCode}
                </p>
              </Block>
            )}
          </TableBuilderColumn>
          <TableBuilderColumn header="PRESENT">
            {(row) => (
              <ParagraphSmall>
                {row.present !== 1 ? `${row.present} classes` : `${row.present} class`}
              </ParagraphSmall>
            )}
          </TableBuilderColumn>
          <TableBuilderColumn header="ABSENT">
            {(row) => (
              <ParagraphSmall>
                {row.absent !== 1 ? `${row.absent} classes` : `${row.absent} class`}
              </ParagraphSmall>
            )}
          </TableBuilderColumn>
          <TableBuilderColumn header="PERCENTAGE" numeric sortable>
            {(row) => <ParagraphSmall>{`${row.percentage}%`}</ParagraphSmall>}
          </TableBuilderColumn>
        </TableBuilder>
      </Block>
    </Block>
  );
}

StudentAttendance.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentAttendance;
