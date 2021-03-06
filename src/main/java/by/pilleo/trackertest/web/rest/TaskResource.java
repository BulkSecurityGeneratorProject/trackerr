package by.pilleo.trackertest.web.rest;

import by.pilleo.trackertest.domain.User;
import by.pilleo.trackertest.repository.UserRepository;
import by.pilleo.trackertest.security.SecurityUtils;
import com.codahale.metrics.annotation.Timed;
import by.pilleo.trackertest.domain.Task;

import by.pilleo.trackertest.repository.TaskRepository;
import by.pilleo.trackertest.web.rest.errors.BadRequestAlertException;
import by.pilleo.trackertest.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Task.
 */
@RestController
@RequestMapping("/api")
public class TaskResource {

    private final Logger log = LoggerFactory.getLogger(TaskResource.class);

    private static final String ENTITY_NAME = "task";

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskResource(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository=userRepository;
    }

    /**
     * POST  /tasks : Create a new task.
     *
     * @param task the task to create
     * @return the ResponseEntity with status 201 (Created) and with body the new task, or with status 400 (Bad Request) if the task has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tasks")
    @Timed
    public ResponseEntity<Task> createTask(@RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to save Task : {}", task);
        if (task.getId() != null) {
            throw new BadRequestAlertException("A new task cannot already have an ID", ENTITY_NAME, "idexists");
        }
        for (User user:task.getUsers()             ) {
            task.getUsers().remove(user);

            user= userRepository.findOneWithEager(user.getId());
            // task.addUser(user);
            user.addTask(task);
        }
        Task result = taskRepository.save(task);
        for (User user:result.getUsers()    ) {
            userRepository.save(user);

        }
        return ResponseEntity.created(new URI("/api/tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tasks : Updates an existing task.
     *
     * @param task the task to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated task,
     * or with status 400 (Bad Request) if the task is not valid,
     * or with status 500 (Internal Server Error) if the task couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tasks")
    @Timed
    public ResponseEntity<Task> updateTask(@RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to update Task : {}", task);
        if (task.getId() == null) {
            return createTask(task);
        }


        for (User user:task.getUsers()             ) {
            task.getUsers().remove(user);

            user= userRepository.findOneWithEager(user.getId());
            // task.addUser(user);
            user.addTask(task);
            userRepository.save(user);
        }

        Task result = taskRepository.save(task);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, task.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tasks : get all the tasks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tasks in body
     */
    @GetMapping("/tasks")
    @Timed
    public List<Task> getAllTasks() {
        log.debug("REST request to get all Tasks");
        return taskRepository.findAll();
        }

    /**
     * GET  /tasks/:id : get the "id" task.
     *
     * @param id the id of the task to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the task, or with status 404 (Not Found)
     */
    @GetMapping("/tasks/{id}")
    @Timed
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        log.debug("REST request to get Task : {}", id);
        Task task = taskRepository.findOneEager(id);
        task.getComments().forEach(e->e.setTask(new Task()));
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(task));
    }


    @GetMapping("/tasks/project/{id}")
    @Timed
    public List<Task> getTasksForProjectAndCurrUser(@PathVariable Long id) {
        log.debug("REST request to get Task : {}", id);
        User currentUser = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get() ;

        List<Task> result = taskRepository.findWithEagerForProjectAndCurrUser(id, currentUser.getId());
        result.forEach(task -> task.getComments().forEach(e->e.setTask(new Task())));
        ;
        return result;
    }
    /**
     * DELETE  /tasks/:id : delete the "id" task.
     *
     * @param id the id of the task to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tasks/{id}")
    @Timed
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.debug("REST request to delete Task : {}", id);
        taskRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
