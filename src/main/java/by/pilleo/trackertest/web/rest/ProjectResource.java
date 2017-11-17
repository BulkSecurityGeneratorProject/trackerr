package by.pilleo.trackertest.web.rest;

import by.pilleo.trackertest.domain.Project;
import by.pilleo.trackertest.domain.Task;
import by.pilleo.trackertest.domain.User;
import by.pilleo.trackertest.repository.ProjectRepository;
import by.pilleo.trackertest.repository.UserRepository;
import by.pilleo.trackertest.security.SecurityUtils;
import by.pilleo.trackertest.web.rest.errors.BadRequestAlertException;
import by.pilleo.trackertest.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Project.
 */
@RestController
@RequestMapping("/api")
public class ProjectResource {

    private final Logger log = LoggerFactory.getLogger(ProjectResource.class);

    private static final String ENTITY_NAME = "project";

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    public ProjectResource(ProjectRepository projectRepository, UserRepository userRepository) {
        this.userRepository=userRepository;
        this.projectRepository = projectRepository;
    }

    /**
     * POST  /projects : Create a new project.
     *
     * @param project the project to create
     * @return the ResponseEntity with status 201 (Created) and with body the new project, or with status 400 (Bad Request) if the project has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/projects")
    @Timed
    public ResponseEntity<Project> createProject(@RequestBody Project project) throws URISyntaxException {
        log.debug("REST request to save Project : {}", project);
        if (project.getId() != null) {
            throw new BadRequestAlertException("A new project cannot already have an ID", ENTITY_NAME, "idexists");
        }
        User currentUser = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get() ;
        for (User user: project.getUsers()   ) {
            project.getUsers().remove(user);
            user= userRepository.findOneWithEager(user.getId());
            project.addUser(user);
            user.addProjects(project);
        }
        project.addUser(currentUser);

        Project result = projectRepository.save(project);
        for (User user:result.getUsers()    ) {
            userRepository.save(user);

        }
        return ResponseEntity.created(new URI("/api/projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /projects : Updates an existing project.
     *
     * @param project the project to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated project,
     * or with status 400 (Bad Request) if the project is not valid,
     * or with status 500 (Internal Server Error) if the project couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/projects")
    @Timed
    public ResponseEntity<Project> updateProject(@RequestBody Project project) throws URISyntaxException {
        log.debug("REST request to update Project : {}", project);
        if (project.getId() == null) {
            return createProject(project);
        }
        for (User user: project.getUsers()   ) {
            project.getUsers().remove(user);
            user= userRepository.findOneWithEager(user.getId());
            project.addUser(user);
            user.addProjects(project);
        }
        Project result = projectRepository.save(project);
        for (User user:result.getUsers()    ) {
            userRepository.save(user);

        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, project.getId().toString()))
            .body(result);
    }

    /**
     * GET  /projects : get all the projects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of projects in body
     */
    @GetMapping("/projects")
    @Timed
    public List<Project> getAllProjectsOfCurrentUser() {
        log.debug("REST request to get all Projects");
        List<Project> projects=projectRepository.getAllProjectsOfCurrentUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get());



        for (Project project:projects
            ) {

            for (Task task: project.getTasks()
                ) {
                task.setProject(new Project());
                task.setUsers(new HashSet<>());
            }
        }



        return projects;
    }

    /**
     * GET  /projects/:id : get the "id" project.
     *
     * @param id the id of the project to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the project, or with status 404 (Not Found)
     */
    @GetMapping("/projects/{id}")
    @Timed
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        log.debug("REST request to get Project : {}", id);
        Project project = projectRepository.findOneEagerLoad(id);
        for (Task task: project.getTasks()  ) {
            task.setProject(new Project());
            task.setUsers(new HashSet<>());
        }
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(project));
    }

    /**
     * DELETE  /projects/:id : delete the "id" project.
     *
     * @param id the id of the project to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/projects/{id}")
    @Timed
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        log.debug("REST request to delete Project : {}", id);
        projectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
