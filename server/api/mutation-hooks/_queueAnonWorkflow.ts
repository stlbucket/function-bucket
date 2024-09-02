import scheduleUows from "./_scheduleUows.js";

const queueWorkflow = async (context: any, projectType: string, workflowInputData: any, appTenantId?: string) => {
  try {
    const workflow = (await context.pgClient.query(`
      select prj_fn.do_queue_anon_workflow(
        $1
        ,$2
        ,$3
      );
    `,[
      projectType
      ,{
        workflowInputData: workflowInputData
      }
      ,appTenantId
    ]
    )).rows[0].do_queue_anon_workflow

    const uowsToSchedule = workflow.uows_to_schedule
    await scheduleUows(uowsToSchedule)
  } catch (error) {
    throw error
  } finally {
  }
}

export default queueWorkflow